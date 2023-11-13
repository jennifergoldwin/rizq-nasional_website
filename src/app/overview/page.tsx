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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/portfolio/${userIdentityNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    return null;
  }
};


const Page = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(null);


  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);

    if (token && identityNumber && fullName) {
      const role = ROLE.ROLE_USER;
      setUser({ token, identityNumber, fullName,role });

      const fetchData = async () => {
        const data = await fetchUserPortfolio();
        console.log(data)
        setUserPortfolio(data.result);
      };
  
      fetchData();
      
    }else{
      toast('Error occured, please login', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      setTimeout(() => router.replace("/login"), 2000);
    }
  }, []);

  return (
    <main className="min-h-screen md:pl-64 w-full">
      <div className="max-w-full mx-auto h-full w-full">
        <UserDetails user={user} totalDeposit={userPortfolio?.portfolio.total_deposit || 0} totalInvestment={userPortfolio?.portfolio.total_investment || 0} totalProfit={userPortfolio?.portfolio.total_profit || 0}/>
        <div className="flex lg:flex-row flex-col w-full">
          <div className="w-full lg:w-2/5">
            <div className="bg-[#01115E] px-8 py-6 rounded-xl my-6 mx-6 flex flex-col justify-center items-center">
              <h1 className="text-center text-xl font-semibold pb-8 pt-4">
                Investment Summary
              </h1>
              {/* <svg
                width="280"
                height="250"
                viewBox="0 0 310 310"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text>{8900}</text>
                <path
                  d="M218.172 264.019C222.049 270.709 219.791 279.346 212.747 282.536C186.576 294.387 157.272 297.945 128.827 292.532C95.7779 286.242 66.0991 268.263 45.2213 241.883C24.3434 215.503 13.6628 182.488 15.1339 148.878C16.4001 119.95 26.5954 92.2475 44.1418 69.4983C48.864 63.3759 57.7886 63.1621 63.4091 68.4719C69.0296 73.7817 69.1989 82.5983 64.6313 88.8369C51.6252 106.601 44.0789 127.901 43.1071 150.102C41.9303 176.99 50.4748 203.403 67.177 224.506C83.8793 245.61 107.622 259.994 134.061 265.025C155.892 269.18 178.356 266.729 198.633 258.151C205.754 255.139 214.296 257.329 218.172 264.019Z"
                  fill="white"
                />
                <g filter="url(#filter0_f_97_90)">
                  <path
                    d="M218.172 264.019C222.049 270.709 219.791 279.346 212.747 282.536C186.576 294.387 157.272 297.945 128.827 292.532C95.7779 286.242 66.0991 268.263 45.2213 241.883C24.3434 215.503 13.6628 182.488 15.1339 148.878C16.4001 119.95 26.5954 92.2475 44.1418 69.4983C48.864 63.3759 57.7886 63.1621 63.4091 68.4719C69.0296 73.7817 69.1989 82.5983 64.6313 88.8369C51.6252 106.601 44.0789 127.901 43.1071 150.102C41.9303 176.99 50.4748 203.403 67.177 224.506C83.8793 245.61 107.622 259.994 134.061 265.025C155.892 269.18 178.356 266.729 198.633 258.151C205.754 255.139 214.296 257.329 218.172 264.019Z"
                    fill="#53CF60"
                  />
                </g>
                <g filter="url(#filter1_f_97_90)">
                  <path
                    d="M218.172 264.019C222.049 270.709 219.791 279.346 212.747 282.536C186.576 294.387 157.272 297.945 128.827 292.532C95.7779 286.242 66.0991 268.263 45.2213 241.883C24.3434 215.503 13.6628 182.488 15.1339 148.878C16.4001 119.95 26.5954 92.2475 44.1418 69.4983C48.864 63.3759 57.7886 63.1621 63.4091 68.4719C69.0296 73.7817 69.1989 82.5983 64.6313 88.8369C51.6252 106.601 44.0789 127.901 43.1071 150.102C41.9303 176.99 50.4748 203.403 67.177 224.506C83.8793 245.61 107.622 259.994 134.061 265.025C155.892 269.18 178.356 266.729 198.633 258.151C205.754 255.139 214.296 257.329 218.172 264.019Z"
                    fill="#53CF60"
                  />
                </g>
                <path
                  d="M47.5924 89.1242C41.0014 85.0818 38.8816 76.4105 43.5619 70.2559C52.8328 58.0647 64.0613 47.4515 76.819 38.8633C93.4567 27.6631 112.307 20.1685 132.093 16.8868C151.879 13.6051 172.139 14.613 191.502 19.8422C206.349 23.852 220.402 30.2719 233.113 38.8173C239.529 43.1314 240.322 52.0227 235.389 57.9765C230.456 63.9304 221.67 64.6731 215.147 60.5208C205.605 54.446 195.174 49.8371 184.201 46.8738C168.711 42.6904 152.503 41.8841 136.674 44.5094C120.845 47.1348 105.765 53.1305 92.4552 62.0907C83.0268 68.4377 74.6423 76.1672 67.5721 84.9974C62.7394 91.033 54.1835 93.1667 47.5924 89.1242Z"
                  fill="white"
                />
                <g filter="url(#filter2_f_97_90)">
                  <path
                    d="M47.5924 89.1242C41.0014 85.0818 38.8816 76.4105 43.5619 70.2559C52.8328 58.0647 64.0613 47.4515 76.819 38.8633C93.4567 27.6631 112.307 20.1685 132.093 16.8868C151.879 13.6051 172.139 14.613 191.502 19.8422C206.349 23.852 220.402 30.2719 233.113 38.8173C239.529 43.1314 240.322 52.0227 235.389 57.9765C230.456 63.9304 221.67 64.6731 215.147 60.5208C205.605 54.446 195.174 49.8371 184.201 46.8738C168.711 42.6904 152.503 41.8841 136.674 44.5094C120.845 47.1348 105.765 53.1305 92.4552 62.0907C83.0268 68.4377 74.6423 76.1672 67.5721 84.9974C62.7394 91.033 54.1835 93.1667 47.5924 89.1242Z"
                    fill="#4DC2E8"
                  />
                </g>
                <g filter="url(#filter3_f_97_90)">
                  <path
                    d="M47.5924 89.1242C41.0014 85.0818 38.8816 76.4105 43.5619 70.2559C52.8328 58.0647 64.0613 47.4515 76.819 38.8633C93.4567 27.6631 112.307 20.1685 132.093 16.8868C151.879 13.6051 172.139 14.613 191.502 19.8422C206.349 23.852 220.402 30.2719 233.113 38.8173C239.529 43.1314 240.322 52.0227 235.389 57.9765C230.456 63.9304 221.67 64.6731 215.147 60.5208C205.605 54.446 195.174 49.8371 184.201 46.8738C168.711 42.6904 152.503 41.8841 136.674 44.5094C120.845 47.1348 105.765 53.1305 92.4552 62.0907C83.0268 68.4377 74.6423 76.1672 67.5721 84.9974C62.7394 91.033 54.1835 93.1667 47.5924 89.1242Z"
                    fill="#4DC2E8"
                  />
                </g>
                <path
                  d="M221.138 47.7536C225.196 41.1725 233.873 39.0739 240.016 43.7692C256.793 56.592 270.502 73.084 280.051 92.0529C291.704 115.203 296.702 141.134 294.488 166.957C292.275 192.78 282.937 217.482 267.514 238.311C254.876 255.378 238.56 269.296 219.846 279.077C212.993 282.658 204.8 279.114 201.921 271.938C199.042 264.762 202.581 256.685 209.342 252.934C223.282 245.198 235.46 234.548 245.011 221.649C257.349 204.985 264.82 185.224 266.591 164.566C268.362 143.907 264.363 123.163 255.041 104.642C247.824 90.3061 237.637 77.7383 225.216 67.7433C219.192 62.8959 217.079 54.3348 221.138 47.7536Z"
                  fill="white"
                />
                <g filter="url(#filter4_f_97_90)">
                  <path
                    d="M221.138 47.7536C225.196 41.1725 233.873 39.0739 240.016 43.7692C256.793 56.592 270.502 73.084 280.051 92.0529C291.704 115.203 296.702 141.134 294.488 166.957C292.275 192.78 282.937 217.482 267.514 238.311C254.876 255.378 238.56 269.296 219.846 279.077C212.993 282.658 204.8 279.114 201.921 271.938C199.042 264.762 202.581 256.685 209.342 252.934C223.282 245.198 235.46 234.548 245.011 221.649C257.349 204.985 264.82 185.224 266.591 164.566C268.362 143.907 264.363 123.163 255.041 104.642C247.824 90.3061 237.637 77.7383 225.216 67.7433C219.192 62.8959 217.079 54.3348 221.138 47.7536Z"
                    fill="#4768D7"
                  />
                </g>
                <g filter="url(#filter5_f_97_90)">
                  <path
                    d="M221.138 47.7536C225.196 41.1725 233.873 39.0739 240.016 43.7692C256.793 56.592 270.502 73.084 280.051 92.0529C291.704 115.203 296.702 141.134 294.488 166.957C292.275 192.78 282.937 217.482 267.514 238.311C254.876 255.378 238.56 269.296 219.846 279.077C212.993 282.658 204.8 279.114 201.921 271.938C199.042 264.762 202.581 256.685 209.342 252.934C223.282 245.198 235.46 234.548 245.011 221.649C257.349 204.985 264.82 185.224 266.591 164.566C268.362 143.907 264.363 123.163 255.041 104.642C247.824 90.3061 237.637 77.7383 225.216 67.7433C219.192 62.8959 217.079 54.3348 221.138 47.7536Z"
                    fill="#4768D7"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_97_90"
                    x="0"
                    y="49.6854"
                    width="235.055"
                    height="260.315"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter1_f_97_90"
                    x="0"
                    y="49.6854"
                    width="235.055"
                    height="260.315"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter2_f_97_90"
                    x="26.0415"
                    y="0"
                    width="227.543"
                    height="106.197"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter3_f_97_90"
                    x="26.0415"
                    y="0"
                    width="227.543"
                    height="106.197"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter4_f_97_90"
                    x="185.913"
                    y="26.2306"
                    width="124.087"
                    height="269.257"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                  <filter
                    id="filter5_f_97_90"
                    x="185.913"
                    y="26.2306"
                    width="124.087"
                    height="269.257"
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
                      result="effect1_foregroundBlur_97_90"
                    />
                  </filter>
                </defs>
              </svg> */}
              <DoughnutChart totalDeposit={userPortfolio?.portfolio.total_deposit || 0} totalProfit={userPortfolio?.portfolio.total_profit || 0}/>
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
          <div className="w-auto lg:w-3/5 m-6">
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
