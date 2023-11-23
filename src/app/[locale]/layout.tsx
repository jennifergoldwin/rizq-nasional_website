import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const locales = ["en", "ms"];

export const metadata: Metadata = {
  title: "Rizq-Nasional",
  description: "Financial solutions that make every cent matter",
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: any };
}) {
  if (!locales.includes(params.locale as any)) notFound();
  unstable_setRequestLocale(params.locale);
  const messages = useMessages();
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
