"use client";
import BankDetails from "@/components/form/bank";
import ProfileDetails from "@/components/form/profile";
import { useEffect, useState } from "react";
import React from 'react';
import Cookies from 'js-cookie';
import { cookies } from "@/utils/constant";
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";

export default function Page() {
  const [data, setData] = useState(null);

  const router = useRouter();

  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);
    console.log(`id :${token}`)

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

      console.log(result);

      if (!error){
        setData(result);
      }
     
      
    } catch (error: any) {
        router.refresh()
    }
  };

  return (
    <div className="min-h-screen md:pl-64 w-full">
      <ProfileDetails data={data}/>
      <BankDetails data={data} />
    </div>
  );
}
