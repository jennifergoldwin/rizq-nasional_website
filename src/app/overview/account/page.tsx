"use client";
import BankDetails from "@/components/form/bank";
import ProfileDetails from "@/components/form/profile";
import { useEffect, useState } from "react";
import React from 'react';
import Cookies from 'js-cookie';
import { cookies } from "@/utils/constant";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";
import { User } from "@/utils/model";
import { ProfileData } from "@/interface/profiles";

export default function Page() {
  const [data, setData] = useState<ProfileData>();

  const router = useRouter();

  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);
  
    if (token && identityNumber && fullName) {
      fetchUserData(token,identityNumber)
    }
    else{
      toast('Error occured, please login', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      // setTimeout(() => router.replace("/login"), 2000);
    }
  }, []);

  const fetchUserData = async (token: String, identityNumber:String) => {
    try {
      if (token === "" || identityNumber==="") {
        toast('Error occured, please login', { hideProgressBar: true, autoClose: 2000, type: 'error' })
        // setTimeout(() => router.replace("/login"), 2000);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/user/${identityNumber}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin' : '*'
        },
      });

      const {error,message,result} = await response.json();

      if (!error){
        setData(result);
      }
     
      
    } catch (error: any) {
        router.refresh()
    }
  };

  const updateBank = async (data: User) => {
    try {
      const token = Cookies.get(cookies.token) || "";
      const ic = Cookies.get(cookies.identityNumber) || "";
      if (token === "" || ic === "") return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/update-bank`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const { error, message, result } = await response.json();

      
      // showToast(message, !error);

      if (!error) {
        fetchUserData(token, ic);
      }
    } catch (error: any) {}
  };

  const updateProfile = async (data: User) => {
    try {
      const token = Cookies.get(cookies.token) || "";
      const ic = Cookies.get(cookies.identityNumber) || "";
      if (token === "" || ic === "") return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/update-profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const { error, message, result } = await response.json();

      
      // showToast(message, !error);

      if (!error) {
        fetchUserData(token, ic);
      }
    } catch (error: any) {}
  };

  const handleUpdateBank = (value : any) => {
    updateBank(value)
  }

  const handleUpdateProfile = (value : any) => {
    updateProfile(value)
  }

  return (
    <div className="min-h-screen md:pl-64 w-full">
      <ProfileDetails profile={data} handleUpdate={handleUpdateProfile}/>
      <BankDetails profile={data} handleUpdate={handleUpdateBank}/>
    </div>
  );
}
