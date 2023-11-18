"use client";

import UserDetails from "@/components/overview/user";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import GeoAllocation from "@/components/overview/geoAllocation";
import AssetsAllocation from "@/components/overview/assetsAllocation";
import { useRouter } from "next/navigation";
import { ROLE, User } from "@/utils/model";
import { cookies } from "@/utils/constant";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
import { UserPortfolio } from "@/interface/portfolio";
import InvestmentChart from "@/components/overview/investmentChart";
import DoughnutChart from "@/components/doughnut";

const fetchUserPortfolio = async () => {
  try {
    const userIdentityNumber = Cookies.get(cookies.identityNumber);
    const token = Cookies.get(cookies.token);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/portfolio/${userIdentityNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.message)
    return data;
  } catch (error) {

    return null;
  }
};

const Page = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(
    null
  );

  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);

    if (token && identityNumber && fullName) {
      const role = ROLE.ROLE_USER;
      setUser({ token, identityNumber, fullName, role });

      const fetchData = async () => {
        const data = await fetchUserPortfolio();
       
        setUserPortfolio(data.result);
      };

      fetchData();
    } else {
      toast("Error occured, please login", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
      setTimeout(() => router.replace("/login"), 2000);
    }
  }, []);

  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto h-full w-full">
        <UserDetails
          user={user}
          totalDeposit={userPortfolio?.portfolio.total_deposit || 0}
          totalInvestment={userPortfolio?.portfolio.total_investment || 0}
          totalProfit={userPortfolio?.portfolio.total_profit || 0}
        />
        <div className="flex lg:flex-row flex-col w-full ">
          <div className="w-full lg:w-2/5">
            <div className="bg-[#01115E] px-8 py-6 rounded-xl ml-6 mt-6 mb-6 mr-6 lg:mr-4  flex flex-col justify-center items-center">
              <h1 className="text-center text-xl font-semibold pb-8 pt-4">
                Investment Summary
              </h1>
              <DoughnutChart
                totalDeposit={userPortfolio?.portfolio.total_deposit || 0}
                totalProfit={userPortfolio?.portfolio.total_profit || 0}
              />
              <div className="flex  py-4">
                <div className="flex items-center">
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="9" fill="white" />
                    <g filter="url(#filter0_f_97_80)">
                      <circle cx="24" cy="24" r="9" fill="#4868D7" />
                    </g>
                    <g filter="url(#filter1_f_97_80)">
                      <circle cx="24" cy="24" r="9" fill="#4869D7" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_97_80"
                        x="0"
                        y="0"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="7.5"
                          result="effect1_foregroundBlur_97_80"
                        />
                      </filter>
                      <filter
                        id="filter1_f_97_80"
                        x="0"
                        y="0"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="7.5"
                          result="effect1_foregroundBlur_97_80"
                        />
                      </filter>
                    </defs>
                  </svg>
                  <p>Total Profit</p>
                </div>
                {/* <div className="flex items-center">
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="9" fill="white" />
                    <g filter="url(#filter0_f_97_79)">
                      <circle cx="24" cy="24" r="9" fill="#4DC2E8" />
                    </g>
                    <g filter="url(#filter1_f_97_79)">
                      <circle cx="24" cy="24" r="9" fill="#4DC2E8" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_97_79"
                        x="0"
                        y="0"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="7.5"
                          result="effect1_foregroundBlur_97_79"
                        />
                      </filter>
                      <filter
                        id="filter1_f_97_79"
                        x="0"
                        y="0"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="7.5"
                          result="effect1_foregroundBlur_97_79"
                        />
                      </filter>
                    </defs>
                  </svg>

                  <p>Diversified Funds</p>
                </div> */}
                <div className="flex items-center">
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="9" fill="white" />
                    <g filter="url(#filter0_f_97_84)">
                      <circle cx="24" cy="24" r="9" fill="#53CF60" />
                    </g>
                    <g filter="url(#filter1_f_97_84)">
                      <circle cx="24" cy="24" r="9" fill="#53CF60" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_f_97_84"
                        x="0"
                        y="0"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="7.5"
                          result="effect1_foregroundBlur_97_84"
                        />
                      </filter>
                      <filter
                        id="filter1_f_97_84"
                        x="0"
                        y="0"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="BackgroundImageFix"
                          result="shape"
                        />
                        <feGaussianBlur
                          stdDeviation="7.5"
                          result="effect1_foregroundBlur_97_84"
                        />
                      </filter>
                    </defs>
                  </svg>

                  <p>Total Deposit</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-auto lg:w-3/5 ml-6 lg:ml-0 mr-6 mt-6 mb-6 ">
            <AssetsAllocation data={userPortfolio?.stockAllocation || []} />
          </div>
        </div>
        <GeoAllocation />
        <InvestmentChart data={userPortfolio?.investmentGrowth || []} />
      </div>
    </main>
  );
};
export default Page;
