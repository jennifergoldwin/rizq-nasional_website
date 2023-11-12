"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ProfileData } from '../../../interface/profiles';

interface ProfileDetailsProps {
  data: ProfileData | null;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ data }) => {
  return (
    <div className="mx-6 bg-[#01115E] px-8 py-6 rounded-xl my-6">
      <h1 className="font-bold text-xl pb-4">Profile Details</h1>
      <form>
        <div className="flex w-full items-center my-4">
          <div className="w-2/5">Full Name</div>
          <div className="w-3/5">{data?.fullName}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <div className="w-2/5">Identity Card Number</div>
          <div className="w-3/5">{data?.identityNumber}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <div className="w-2/5">Phone Number</div>
          <div className="w-3/5">{data?.phoneNumber}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <div className="w-2/5">Email Address</div>
          <div className="w-3/5">{data?.email}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="state" className="w-2/5">
            State
          </label>
          <input
            value={data?.state}
            type="text"
            id="state"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue="Selangor"
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="city" className="w-2/5">
            City
          </label>
          <input
            value={data?.city}
            type="text"
            id="city"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue="Selayang"
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="address" className="w-2/5">
            Address
          </label>
          <input
            value={data?.address}
            type="text"
            id="address"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue="10D-18-5, Example Resident"
          />
        </div>

        <div className="flex items-center my-4 w-full">
          <label htmlFor="post_code" className="w-2/5">
            Post Code
          </label>
          <input
            value={data?.postCode}
            type="text"
            id="post_code"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue="12345"
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="occupation" className="w-2/5">
            Occupation
          </label>
          <input
            value={data?.occupation}
            type="text"
            id="occupation"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            defaultValue="Manager"
          />
        </div>

        <div className="flex w-full justify-end">
          <div className="flex">
            <button className="border-[#A169F2] text-[#A169F2] rounded-lg border-[2px] py-2 px-4 mr-4">
              Discard
            </button>
            <button className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
