"use client";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ProfileData } from '../../../interface/profiles';
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface ProfileDetailsProps {
  profile: ProfileData | undefined;
  handleUpdate: any;
}

type FormValues = {
  state: string;
  city: string;
  address: string;
  postCode: string;
  occupation: string;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile,handleUpdate }) => {
  const [isEdit,setIsEdit] = React.useState(false);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (profile){
      let u = profile
      u.state = data.state;
      u.address = data.address;
      u.city = data.city;
      u.occupation = data.occupation;
      u.postCode = data.postCode;
      handleUpdate(u);
      console.log(u)
      setIsEdit(!isEdit)
    }
  };

  React.useEffect(() => {
    // Update selectedOption when data changes
    if (profile) {
      setValue("address",profile.address)
      setValue("city",profile.city);
      setValue("occupation",profile.occupation);
      setValue("postCode",profile.postCode);
      setValue("state",profile.state);
    }
  }, [profile]);
  return (
    <div className="mx-6 bg-[#01115E] px-8 py-6 rounded-xl my-6">
      <h1 className="font-bold text-xl pb-4">Profile Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full items-center my-4">
          <div className="w-2/5">Full Name</div>
          <div className="w-3/5">{profile?.fullName}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <div className="w-2/5">Identity Card Number</div>
          <div className="w-3/5">{profile?.identityNumber}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <div className="w-2/5">Phone Number</div>
          <div className="w-3/5">{profile?.phoneNumber}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <div className="w-2/5">Email Address</div>
          <div className="w-3/5">{profile?.email}</div>
        </div>
        <div className="flex items-center my-4 w-full">
          <label htmlFor="state" className="w-2/5">
            State
          </label>
          <input
            disabled={!isEdit}
            
            {...register("state", { required: "State is required" })}
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
            
            {...register("city", { required: "City is required" })}
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
            {...register("address", { required: "Address is required" })}
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
            {...register("postCode", { required: "Post code is required" })}
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
            {...register("occupation", { required: "Occupation is required" })}
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
            <button type='submit' className="text-white bg-[#5A64C3] border-white border-[2px] rounded-lg py-2 px-6">
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
