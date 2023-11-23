import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: any };
};
const locales = ["en", "ms"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = (props: Props) => {
  // const locale = useLocale();
  if (!locales.includes(props.params.locale as any)) notFound();
  const messages = useMessages();
  return (
    <div className="flex flex-col mx-auto w-full">
      <NextIntlClientProvider locale={props.params.locale} messages={messages}>
        <Sidebar />
        <TopBar locale={props.params.locale} />
        {props.children}
      </NextIntlClientProvider>

      {/* {props.children} */}
    </div>
  );
};

export default RootLayout;
