"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ProfileData } from '../../../interface/profiles';

interface ProfileDetailsProps {
  data: ProfileData | undefined;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ data }) => {
  const [isEdit,setIsEdit] = React.useState(false);
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
            disabled={!isEdit}
            defaultValue={data?.state}
            type="text"
            id="state"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="city" className="w-2/5">
            City
          </label>
          <input
            disabled={!isEdit}
            defaultValue={data?.city}
            type="text"
            id="city"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="address" className="w-2/5">
            Address
          </label>
          <input
            disabled={!isEdit}
            defaultValue={data?.address}
            type="text"
            id="address"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            
          />
        </div>

        <div className="flex items-center my-4 w-full">
          <label htmlFor="post_code" className="w-2/5">
            Post Code
          </label>
          <input
            disabled={!isEdit}
            defaultValue={data?.postCode}
            type="text"
            id="post_code"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
           
          />
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="occupation" className="w-2/5">
            Occupation
          </label>
          <input
            disabled={!isEdit}
            defaultValue={data?.occupation}
            type="text"
            id="occupation"
            className="bg-[#2D3681] text-white/[0.3]  rounded-lg py-3 px-4 w-3/5"
            
          />
        </div>

        <div className="flex w-full justify-end">
          {isEdit?<div className="flex">
            <button onClick={()=>setIsEdit(false)} className="border-[#A169F2] text-[#A169F2] rounded-lg border-[2px] py-2 px-4 mr-4">
              Discard
            </button>
            <button onClick={()=>setIsEdit(false)} className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6">
              Save
            </button>
          </div>:<button onClick={()=>setIsEdit(!isEdit)} className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6">
              Edit
            </button>}
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
