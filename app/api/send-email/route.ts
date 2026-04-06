import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const hostEmail = process.env.HOST_EMAIL;

  if (!apiKey || !hostEmail) {
    // Silently succeed — email is optional, WhatsApp is primary
    return NextResponse.json({ status: "skipped", reason: "Email not configured" });
  }

  try {
    const data = await req.json();
    const resend = new Resend(apiKey);

    const guestList = data.guests
      .map(
        (g: { name: string; id: string }, i: number) =>
          `${i + 1}. ${g.name} (ID: ${g.id})`
      )
      .join("\n");

    await resend.emails.send({
      from: "Guidr Check-in <checkin@guidr.info>",
      to: hostEmail,
      subject: `Check-in: ${data.primaryGuest} — ${data.numPassengers} guests`,
      text: `
Guest Check-in Summary
======================

Primary Guest: ${data.primaryGuest}
Total Group: ${data.numPassengers} people
Arrival: ${data.arrivalTime}

Guests:
${guestList}

Bedding:
- Main: ${data.bedConfig.mainRoom}
${data.numPassengers > 1 ? `- Second: ${data.bedConfig.secondRoom}` : ""}

Vehicle: ${data.vehicle.licensePlate || "None"}
${data.vehicle.brand ? `  Brand: ${data.vehicle.brand}` : ""}
`.trim(),
    });

    return NextResponse.json({ status: "sent" });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ status: "ok" });
  }
}
