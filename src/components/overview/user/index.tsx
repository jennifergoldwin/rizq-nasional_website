"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import graph from "../../../../public/assets/icons/graph.png";
import Image from "next/image";

const UserDetails = () => {
  return (
    <div className="mx-6 bg-[#01115E] px-8 py-6 rounded-xl my-6">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-xl">{"User's Full Name"}</h1>
        <div className="text-[#AF80F4] border-[1px] border-[#AF80F4] px-3 rounded-lg">
          Active
        </div>
      </div>
      <p className="text-white/[0.5] mb-4">ID: 12344567890</p>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-2 py-3 rounded-lg text-center h-full">
            <span>Current Value</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>RM86,000</span>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Your Deposit</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>RM10,000</span>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Total Profits</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>RM76,000</span>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Total Rate</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>%1,005</span>
          </div>
        </SwiperSlide>
        <SwiperSlide className="!h-auto">
          <div className="bg-[#2D3681] flex flex-col justify-center items-center px-4 py-3 rounded-lg text-center h-full">
            <span>Investment</span>
            <Image width={70} src={graph} alt="graph icon" />
            <span>5</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default UserDetails;
