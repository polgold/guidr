"use client";

import { useState } from "react";
import { ct } from "@/lib/checkin-translations";
import type { Locale } from "@/lib/i18n";

type BedOption = "1 double bed" | "2 single beds";

interface Guest {
  firstName: string;
  lastName: string;
  idNumber: string;
  idPhoto?: string;
}

interface GuestData {
  guests: Guest[];
  numPassengers: number;
  arrivalTime: string;
  bedConfig: { mainRoom: BedOption; secondRoom: BedOption };
  vehicle: { brand: string; model: string; color: string; licensePlate: string };
}

interface Props {
  locale: Locale;
  propertyId: string;
  propertyNickname: string;
  hostPhone: string;
}

const TOTAL_STEPS = 7;
const TIME_OPTIONS = [
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "21:00", label: "9:00 PM" },
];

export function CheckInForm({ locale, propertyId, propertyNickname, hostPhone }: Props) {
  const t = (key: string) => ct(locale, key);

  const [step, setStep] = useState(1);
  const [isProcessingId, setIsProcessingId] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [hasVehicle, setHasVehicle] = useState(false);
  const [data, setData] = useState<GuestData>({
    guests: [{ firstName: "", lastName: "", idNumber: "", idPhoto: "" }],
    numPassengers: 1,
    arrivalTime: "15:00",
    bedConfig: { mainRoom: "1 double bed", secondRoom: "1 double bed" },
    vehicle: { brand: "", model: "", color: "", licensePlate: "" },
  });

  const resetForm = () => {
    setStep(1);
    setIsSending(false);
    setHasVehicle(false);
    setData({
      guests: [{ firstName: "", lastName: "", idNumber: "", idPhoto: "" }],
      numPassengers: 1,
      arrivalTime: "15:00",
      bedConfig: { mainRoom: "1 double bed", secondRoom: "1 double bed" },
      vehicle: { brand: "", model: "", color: "", licensePlate: "" },
    });
  };

  const nextStep = () => {
    if (step === 2 && data.numPassengers === 1) setStep(4);
    else setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    if (step === 4 && data.numPassengers === 1) setStep(2);
    else setStep((s) => Math.max(s - 1, 1));
  };

  const updateGuest = (index: number, fields: Partial<Guest>) => {
    setData((prev) => {
      const guests = [...prev.guests];
      guests[index] = { ...guests[index], ...fields };
      return { ...prev, guests };
    });
  };

  const handleIdUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingId(index);
    const reader = new FileReader();
    const base64 = await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    updateGuest(index, { idPhoto: base64 });

    try {
      const res = await fetch("/api/extract-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      if (res.ok) {
        const extracted = await res.json();
        if (extracted && !extracted.error) {
          updateGuest(index, {
            firstName: extracted.firstName || data.guests[index].firstName,
            lastName: extracted.lastName || data.guests[index].lastName,
            idNumber: extracted.idNumber || data.guests[index].idNumber,
          });
        }
      }
    } catch {
      // Gemini not configured — user fills manually
    }
    setIsProcessingId(null);
  };

  const sendWhatsApp = () => {
    const bedText = (opt: BedOption) =>
      opt === "1 double bed" ? t("doubleBed") : t("singleBeds");

    let msg = `*${propertyNickname}*\n`;
    msg += `*${t("title")}*\n`;
    msg += `----------------------------\n`;
    msg += `*${t("hostCheck")}:* ${data.guests[0].firstName} ${data.guests[0].lastName}\n`;
    msg += `*${t("totalGroup")}:* ${data.numPassengers} ${t("people")}\n\n`;
    msg += `*${t("checkinTime")}:* ${data.arrivalTime}\n\n`;

    if (data.vehicle.licensePlate || data.vehicle.brand) {
      msg += `*${t("vehicle")}:*\n`;
      if (data.vehicle.brand) msg += `- ${t("carBrand")}: ${data.vehicle.brand}\n`;
      if (data.vehicle.licensePlate) msg += `- ${t("plateNumber")}: ${data.vehicle.licensePlate}\n`;
      msg += "\n";
    } else {
      msg += `*${t("vehicle")}:* ${t("none")}\n\n`;
    }

    msg += `*${t("beddingSelection")}:*\n`;
    msg += `- ${t("main")}: ${bedText(data.bedConfig.mainRoom)}\n`;
    if (data.numPassengers > 1) {
      msg += `- ${t("second")}: ${bedText(data.bedConfig.secondRoom)}\n`;
    }
    msg += "\n";

    msg += `*Guests:*\n`;
    data.guests.forEach((g, i) => {
      msg += `${i + 1}. ${g.firstName} ${g.lastName} (ID: ${g.idNumber})\n`;
    });

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${hostPhone}?text=${encoded}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 6) {
      setIsSending(true);
      sendWhatsApp();

      // Also try email (non-blocking)
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            primaryGuest: `${data.guests[0].firstName} ${data.guests[0].lastName}`,
            numPassengers: data.numPassengers,
            arrivalTime: data.arrivalTime,
            guests: data.guests.map((g) => ({
              name: `${g.firstName} ${g.lastName}`,
              id: g.idNumber || "N/A",
            })),
            bedConfig: data.bedConfig,
            vehicle: data.vehicle,
          }),
        });
      } catch {
        // Email is optional
      }

      setStep(7);
      setIsSending(false);
    } else {
      nextStep();
    }
  };

  // --- Styles ---
  const inputClass =
    "w-full p-4 bg-white rounded-xl border border-[color:var(--line)] focus:ring-2 focus:ring-[color:var(--brand)] focus:border-transparent outline-none font-medium text-[color:var(--ink)]";
  const labelClass = "text-[10px] font-semibold text-[color:var(--ink-mute)] uppercase tracking-[0.18em]";

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-[var(--shadow-lg)] overflow-hidden border border-[color:var(--line)]">
      {/* Header */}
      <div className="bg-[color:var(--ink)] py-10 px-6 text-white text-center">
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium">
          {t("title")}
        </h1>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
          {propertyNickname}
        </p>
      </div>

      <div className="p-8">
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all text-sm font-semibold ${
                  i + 1 <= step
                    ? "bg-[color:var(--brand)] text-white"
                    : "bg-[color:var(--bg-alt)] text-[color:var(--ink-mute)] border border-[color:var(--line)]"
                }`}
              >
                {i + 1 < step ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < TOTAL_STEPS - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    i + 1 < step ? "bg-[color:var(--brand)]" : "bg-[color:var(--line)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Primary Guest */}
          {step === 1 && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
              <div className="border-b border-[color:var(--line)] pb-4">
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-medium text-[color:var(--ink)]">
                  {t("primaryGuest")}
                </h2>
                <p className="text-sm text-[color:var(--ink-mute)]">{t("legalVerification")}</p>
              </div>

              <div className="space-y-4">
                {/* ID Upload */}
                <div className="relative">
                  {!data.guests[0].idPhoto ? (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[color:var(--line)] rounded-2xl cursor-pointer hover:border-[color:var(--brand)] hover:bg-[color:var(--bg-alt)] transition-all group">
                      <div className="flex flex-col items-center text-center px-4">
                        <svg className="w-14 h-14 mb-3 text-[color:var(--ink-mute)] group-hover:text-[color:var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        </svg>
                        <p className={labelClass}>{t("tapUploadId")}</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleIdUpload(0, e)} />
                    </label>
                  ) : (
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-[color:var(--line)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={data.guests[0].idPhoto} alt="ID Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => updateGuest(0, { idPhoto: "" })} className="absolute top-3 right-3 p-2 bg-[color:var(--ink)] text-white rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {isProcessingId === 0 && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-[color:var(--brand)] border-t-transparent rounded-full animate-spin" />
                        <p className={`mt-4 ${labelClass} text-[color:var(--brand)]`}>{t("aiScanning")}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClass}>{t("firstName")}</label>
                    <input className={inputClass} value={data.guests[0].firstName} required onChange={(e) => updateGuest(0, { firstName: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>{t("lastName")}</label>
                    <input className={inputClass} value={data.guests[0].lastName} required onChange={(e) => updateGuest(0, { lastName: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>{t("idNumber")}</label>
                  <input className={inputClass} value={data.guests[0].idNumber} required onChange={(e) => updateGuest(0, { idNumber: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Additional Guests Count */}
          {step === 2 && (
            <div className="space-y-10 py-6 text-center">
              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[color:var(--ink)]">{t("additionalGuests")}</h2>
                <p className="text-[color:var(--ink-mute)]">{t("travelCompanions")}</p>
              </div>
              <div className="flex items-center justify-center space-x-12">
                <button type="button" disabled={data.numPassengers <= 1} onClick={() => {
                  const n = Math.max(1, data.numPassengers - 1);
                  setData((p) => ({ ...p, numPassengers: n, guests: p.guests.slice(0, n) }));
                }} className="w-20 h-20 rounded-full border-2 border-[color:var(--line)] flex items-center justify-center text-[color:var(--ink-mute)] hover:border-[color:var(--brand)] hover:text-[color:var(--brand)] transition-all disabled:opacity-30">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
                </button>
                <div className="flex flex-col">
                  <span className="text-8xl font-[family-name:var(--font-fraunces)] font-medium text-[color:var(--brand)] leading-none">{data.numPassengers - 1}</span>
                  <p className={`${labelClass} mt-2`}>{t("extraGuests")}</p>
                </div>
                <button type="button" disabled={data.numPassengers >= 6} onClick={() => {
                  const n = Math.min(6, data.numPassengers + 1);
                  const guests = [...data.guests];
                  if (n > guests.length) guests.push({ firstName: "", lastName: "", idNumber: "" });
                  setData((p) => ({ ...p, numPassengers: n, guests }));
                }} className="w-20 h-20 rounded-full border-2 border-[color:var(--line)] flex items-center justify-center text-[color:var(--ink-mute)] hover:border-[color:var(--brand)] hover:text-[color:var(--brand)] transition-all disabled:opacity-30">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Companion Info */}
          {step === 3 && (
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-3">
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-medium text-[color:var(--ink)] sticky top-0 bg-white py-2 z-20">{t("companionInfo")}</h2>
              {data.guests.slice(1).map((guest, idx) => (
                <div key={idx + 1} className="p-6 bg-[color:var(--bg-alt)] rounded-2xl space-y-4">
                  <h3 className={`${labelClass} text-[color:var(--brand)]`}>{t("passenger")} {idx + 2}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputClass} placeholder={t("firstName")} value={guest.firstName} required onChange={(e) => updateGuest(idx + 1, { firstName: e.target.value })} />
                    <input className={inputClass} placeholder={t("lastName")} value={guest.lastName} required onChange={(e) => updateGuest(idx + 1, { lastName: e.target.value })} />
                  </div>
                  <input className={inputClass} placeholder={t("idNumber")} value={guest.idNumber} required onChange={(e) => updateGuest(idx + 1, { idNumber: e.target.value })} />
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Stay Preferences */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-medium text-[color:var(--ink)]">{t("stayPreferences")}</h2>
              <div>
                <label className={`${labelClass} block mb-2`}>{t("checkinTime")}</label>
                <select className={inputClass} value={data.arrivalTime} onChange={(e) => setData((d) => ({ ...d, arrivalTime: e.target.value }))}>
                  {TIME_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="space-y-4 pt-4">
                <h3 className={labelClass}>{t("beddingSelection")}</h3>
                <div className="p-5 bg-[color:var(--bg-alt)] rounded-2xl">
                  <p className="text-xs font-semibold text-[color:var(--ink-soft)] mb-4">{t("masterBedroom")}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(["1 double bed", "2 single beds"] as BedOption[]).map((opt) => (
                      <button key={opt} type="button" onClick={() => setData((d) => ({ ...d, bedConfig: { ...d.bedConfig, mainRoom: opt } }))}
                        className={`p-4 rounded-xl text-sm font-semibold transition-all ${data.bedConfig.mainRoom === opt ? "bg-[color:var(--brand)] text-white" : "bg-white text-[color:var(--ink-mute)] border border-[color:var(--line)]"}`}>
                        {opt === "1 double bed" ? t("doubleBed") : t("singleBeds")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Parking */}
          {step === 5 && (
            <div className="space-y-8">
              <div className="flex items-center justify-between bg-[color:var(--bg-alt)] p-6 rounded-3xl">
                <div>
                  <h2 className="font-[family-name:var(--font-fraunces)] text-xl font-medium text-[color:var(--ink)]">{t("parkingRequired")}</h2>
                  <p className="text-xs text-[color:var(--ink-mute)]">{t("parkingSub")}</p>
                </div>
                <button type="button" onClick={() => setHasVehicle(!hasVehicle)}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${hasVehicle ? "bg-[color:var(--brand)]" : "bg-[color:var(--line)]"}`}>
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${hasVehicle ? "translate-x-9" : "translate-x-1"}`} />
                </button>
              </div>
              {hasVehicle ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClass}>{t("carBrand")}</label>
                    <input className={inputClass} value={data.vehicle.brand} onChange={(e) => setData((p) => ({ ...p, vehicle: { ...p.vehicle, brand: e.target.value } }))} />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>{t("plateNumber")}</label>
                    <input className={`${inputClass} uppercase`} value={data.vehicle.licensePlate} onChange={(e) => setData((p) => ({ ...p, vehicle: { ...p.vehicle, licensePlate: e.target.value } }))} />
                  </div>
                </div>
              ) : (
                <div className="p-14 border-2 border-dashed border-[color:var(--line)] rounded-3xl text-center">
                  <p className="text-[color:var(--ink-mute)] font-medium italic text-sm">{t("noVehicle")}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Review */}
          {step === 6 && (
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[color:var(--ink)] text-center">{t("finalReview")}</h2>
              <div className="bg-[color:var(--bg-alt)] rounded-3xl p-8 space-y-5">
                <div className="flex justify-between items-center py-1 border-b border-[color:var(--line)]">
                  <span className={labelClass}>{t("hostCheck")}</span>
                  <span className="font-semibold text-[color:var(--ink)]">{data.guests[0].firstName} {data.guests[0].lastName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[color:var(--line)]">
                  <span className={labelClass}>{t("totalGroup")}</span>
                  <span className="font-semibold text-[color:var(--brand)] text-lg">{data.numPassengers} {t("people")}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[color:var(--line)]">
                  <span className={labelClass}>{t("checkinTime")}</span>
                  <span className="font-semibold text-[color:var(--ink)]">{data.arrivalTime}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className={labelClass}>{t("vehicle")}</span>
                  <span className="font-semibold text-[color:var(--ink)]">{hasVehicle ? data.vehicle.licensePlate || data.vehicle.brand : t("none")}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Success */}
          {step === 7 && (
            <div className="text-center py-14">
              <div className="w-28 h-28 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 ring-8 ring-green-100/50">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-[family-name:var(--font-fraunces)] text-4xl font-medium text-[color:var(--ink)]">{t("allSet")}</h2>
              <p className="text-[color:var(--ink-soft)] mt-4 text-lg">{t("successMsg")}<br />{t("enjoyStay")}</p>
              <button type="button" onClick={resetForm}
                className="mt-14 px-14 py-5 bg-[color:var(--ink)] text-white rounded-2xl font-semibold hover:bg-[color:var(--brand)] transition-all uppercase tracking-[0.18em] text-xs">
                {t("closeDone")}
              </button>
            </div>
          )}

          {/* Navigation */}
          {step < 7 && (
            <div className="pt-10 flex items-center justify-between border-t border-[color:var(--line)] mt-10">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-10 py-4 text-[color:var(--ink-mute)] font-semibold hover:text-[color:var(--brand)] uppercase text-xs tracking-[0.18em]">{t("back")}</button>
              ) : <div />}
              <button type="submit" disabled={isProcessingId !== null || isSending}
                className={`px-14 py-4 rounded-2xl font-semibold text-white uppercase text-xs tracking-[0.18em] transition-all disabled:opacity-50 ${
                  step === 6 ? "bg-green-600 hover:bg-green-700" : "bg-[color:var(--brand)] hover:bg-[color:var(--brand-dark)]"
                }`}>
                {isSending ? t("launching") : step === 6 ? t("sendWhatsapp") : t("next")}
              </button>
            </div>
          )}
        </form>
      </div>

      <footer className="py-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-mute)]">
          Guidr<span className="text-[color:var(--accent)]">.</span> · Check-in
        </p>
      </footer>
    </div>
  );
}
