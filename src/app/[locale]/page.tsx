"use client";
import Navbar from "@/components/navbar";
// import {unstable_setRequestLocale} from 'next-intl/server';
// import {locales} from '..';
import Image from "next/image";
import Link from "next/link";
import robo from "../../../public/assets/images/robo.svg";
import robo2 from "../../../public/assets/images/robo2.svg";
import logo from "../../../public/assets/images/logo.png";
import map from "../../../public/assets/images/map.svg";
import family from "../../../public/assets/images/family.png";
import ic_reward from "../../../public/assets/icons/ic_reward.png";
import ic_withdrawl from "../../../public/assets/icons/ic_withdrawl.png";
import ic_invest from "../../../public/assets/icons/ic_invest.png";
import React from "react";
import Cookies from "js-cookie";
import { cookies } from "@/utils/constant";
import { ROLE, User } from "@/utils/model";
import { useLocale, useTranslations } from "next-intl";
export default function Home() {
  // unstable_setRequestLocale(locale);

  const [user, setUser] = React.useState<User | null>(null);
  const t = useTranslations("Frontend");
  const locale = useLocale();
  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);

    if (token && identityNumber && fullName) {
      const role = ROLE.ROLE_USER;
      setUser({ token, identityNumber, fullName, role });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section
          id="landing-page"
          className="bg-[url(/assets/images/background.png)] bg-cover bg-bottom py-16"
        >
          <div className="max-w-screen-2xl md:max-w-screen-xl mx-auto h-full">
            <div className=" flex md:flex-row flex-col h-full">
              <div className="w-full md:w-1/2 flex justify-center flex-col md:px-8 px-4">
                <h1 className="text-5xl font-bold py-4">
                  {/* Investing Made Effortless */}
                  {t("Landing.title")}
                </h1>
                <span className="pb-8 text-xl">{t("Landing.slogan")}</span>
                <Link
                  href={
                    user == null ? `/${locale}/login` : `/${locale}/overview`
                  }
                  className={`w-fit flex text-white bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-3 px-6  font-bold justify-center gap-2`}
                >
                  {t("Landing.button")}
                </Link>
              </div>

              <div className="w-full md:w-1/2 flex justify-end items-end">
                <Image height={580} src={robo} alt={""} />
              </div>
            </div>
          </div>
        </section>

        <section id="slogan-page" className=" relative ">
          <div
            id="blank-page-1"
            className="h-[60px] max-w-screen-2xl md:max-w-screen-xl mx-auto"
          />
          <div className="bg-[#01115e]">
            <div
              className="max-w-screen-2xl md:max-w-screen-xl mx-auto flex flex-col lg:flex-row 
            justify-end items-center  w-full h-auto lg:h-[80vh]"
            >
              <Image
                // width={950}
                src={family}
                alt=""
                className="absolute w-full lg:w-3/5 left-0 top-0 "
              />
              <Image
                // width={950}
                src={family}
                alt=""
                className="w-full opacity-0 lg:hidden block"
              />
              <div className=" w-full lg:h-auto lg:w-2/5 flex justify-center lg:justify-end items-center md:px-8 px-4">
                <p className="text-4xl lg:text-3xl font-bold italic lg:py-0 pb-16">
                  {`" ${t("Slogan.title").replace(",", ",\n")} "`}
                </p>
              </div>
            </div>
          </div>
          <div id="blank-page-1" className="h-[10vh]" />
        </section>

        <section id="introduction-page" className="py-16">
          <div className="max-w-screen-2xl md:max-w-screen-xl mx-auto flex justify-center items-center flex-col">
            <Image src={logo} alt="" />
            <div className="md:text-left text-center md:px-8 px-4">
              <h1 className="text-3xl font-bold pt-16 pb-8">
                {t("Introduction.title")}
              </h1>
              <p className="text-xl ">{t("Introduction.desc")}</p>
            </div>
            <Image src={map} alt="" />
          </div>
        </section>

        <section id="total-assets-page" className="bg-[#01115e] py-16">
          <div className="max-w-screen-2xl md:max-w-screen-xl mx-auto flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold">{t("Assets.total")}</h1>
            <span className="text-xl mb-16 mt-8"> {t("Assets.title")} </span>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 justify-items-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">20,483</h1>
                <span className="text-xl">{t("Assets.client")}</span>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">89</h1>
                <span className="text-xl">{t("Assets.managers")}</span>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">{">15"}</h1>
                <span className="text-xl">{t("Assets.experience")}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="why-should-invest-page" className="py-16">
          <div className="max-w-screen-2xl md:max-w-screen-xl mx-auto flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold pb-8">{t("WhyUs.title")}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 w-full justify-items-center gap-8">
              <div className="bg-[#5A64C3] rounded-3xl flex flex-col  items-center w-[200px] h-[250px] px-4 py-6">
                <Image width={80} height={80} src={ic_invest} alt="" />
                <div className="text-center h-full flex justify-center items-center">
                  <span>{t("WhyUs.minimum")}</span>
                </div>
              </div>
              <div className="bg-[#5A64C3] rounded-3xl flex flex-col  items-center w-[200px] h-[250px] px-4 py-6">
                <Image width={80} height={80} src={ic_reward} alt="" />
                <div className="text-center h-full flex justify-center items-center">
                  <span>{t("WhyUs.profit")}</span>
                </div>
              </div>
              <div className="bg-[#5A64C3] rounded-3xl flex flex-col  items-center w-[200px] h-[250px] px-4 py-6">
                <Image width={80} height={80} src={ic_withdrawl} alt="" />
                <div className="text-center h-full flex justify-center items-center">
                  <span>{t("WhyUs.withdrawal")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="who-are-eligible-page" className="bg-[#01115e] py-16">
          <div className="max-w-screen-2xl md:max-w-screen-xl mx-auto flex justify-center items-center flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex justify-center">
              <Image height={450} src={robo2} alt="" />
            </div>
            <div className="w-full md:w-1/2 md:px-8 px-4">
              <h1 className="text-3xl font-bold pt-16 pb-8">
                {t("WhoEligible.who")}
              </h1>
              <ul>
                <li className="inline-flex items-center custom-list-item">
                  <p className="text-xl ">{t("WhoEligible.age")}</p>
                </li>
                <hr className="border-t-2 border-[#5A64C3]/[0.5] mx-14 my-4" />
                <li className="inline-flex items-center custom-list-item">
                  <p className="text-xl ">{t("WhoEligible.race")}</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
