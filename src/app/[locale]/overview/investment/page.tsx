"use client";
import PlanCard from "@/components/plancard";
import { Plan } from "@/utils/model";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cookies, cookiesAdmin } from "@/utils/constant";
import { useLocale, useTranslations } from "next-intl";
export default function Page() {
  const data = [
    {
      type: "Basic",
      period: 14,
      returns: "6500% (MYR 20,000)",
      withdrawl: "any",
      price: 100,
    },
    {
      type: "Standard",
      period: 14,
      returns: "3000% (MYR 30,000)",
      withdrawl: "any",
      price: 500,
    },
    {
      type: "Premium",
      period: 14,
      returns: "3500% (MYR 20,000)",
      withdrawl: "any",
      price: 1000,
    },
  ];
  const [planList, setPlanList] = React.useState<Plan[]>([]);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Overview.Plan");
  React.useEffect(() => {
    const token = Cookies.get(cookies.token) || "";

    // const adminRole = Cookies.get(cookiesAdmin.role) || "";
    if (token != "") {
      fetchPlan(token);
    } else {
      setTimeout(() => router.replace(`/${locale}/login`), 2000);
    }
  }, []);

  const fetchPlan = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/all-plan`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { error, message, result } = await response.json();

      if (!error) {
        setPlanList((prev) => [...result]);
      }
      //   showToast(message, !error);
    } catch (error: any) {}
  };
  return (
    <>
      <main className="min-h-screen md:pl-64 w-full">
        <div className="max-w-full mx-auto flex justify-center items-center h-full">
          <div className="bg-[#01115E] flex flex-col justify-center  px-8 py-8 rounded-3xl my-6 w-full mx-6">
            <h1 className="font-bold text-2xl text-center pb-4">
              {t("title")}
            </h1>
            <p className="text-center">
              {t("desc1")}{" "}
              <a href="#" className="text-[#4DC2E8] underline">
                {t("desc2")}{" "}
              </a>
              {t("desc3")}
            </p>

            <div className="grid md:grid-cols-3 gap-8 py-4 grid-cols-1 justify-items-center items-center">
              {planList.map((item) => (
                <PlanCard data={item} key={item.id} />
              ))}
            </div>
            <p className="text-center text-white/[0.5] italic">{t("warn")}</p>
          </div>
        </div>
      </main>
    </>
  );
}
