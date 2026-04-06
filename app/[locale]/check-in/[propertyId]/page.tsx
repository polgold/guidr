import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getProperty, listPropertyIds } from "@/lib/properties";
import { CheckInForm } from "@/components/checkin/CheckInForm";

export const metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  const ids = listPropertyIds();
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

export default async function CheckInPage({
  params,
}: {
  params: Promise<{ locale: string; propertyId: string }>;
}) {
  const { locale, propertyId } = await params;
  if (!isLocale(locale)) notFound();
  const property = getProperty(propertyId);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[color:var(--bg-alt)] py-12 px-4 sm:px-6 lg:px-8">
      <CheckInForm
        locale={locale as Locale}
        propertyId={propertyId}
        propertyNickname={property.nickname}
        hostPhone={property.contacts[0]?.phone ?? ""}
      />
    </div>
  );
}
