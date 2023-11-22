"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import graph from "../../../../public/assets/icons/graph.png";
import Image from "next/image";
import { User } from "@/utils/model";
import { formatToMYR } from "@/utils/constant";

interface UserDetailProps {
  user: User | null;
  totalDeposit: number;
  totalProfit: number;
  totalInvestment: number;
}
const UserDetails: React.FC<UserDetailProps> = ({
  user,
  totalDeposit = 0,
  totalInvestment = 0,
  totalProfit = 0,
}) => {
  return (
    <div className="mx-6 bg-[#01115E] px-8 py-6 rounded-xl my-6">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-xl">
          {user != null ? user.fullName : ""}
        </h1>
        <div className="text-[#AF80F4] border-[1px] border-[#AF80F4] px-3 rounded-lg">
          Active
        </div>
      </div>
      <p className="text-white/[0.5] mb-4">{`ID: ${
        user !== null ? user.identityNumber : ""
      }`}</p>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          425: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-2 py-3 rounded-lg text-center h-full">
            <span>Current Value</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>{`${formatToMYR(totalDeposit + totalProfit)}`}</span>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Your Deposit</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>{`${formatToMYR(totalDeposit)}`}</span>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Total Profits</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>{`${formatToMYR(totalProfit)}`}</span>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Total Rate</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>{`%${
              isNaN(parseFloat(((totalProfit / totalDeposit) * 100).toFixed(2)))
                ? "0"
                : ((totalProfit / totalDeposit) * 100).toFixed(2)
            }`}</span>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Investment</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>{totalInvestment}</span>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default UserDetails;
