"use client";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import Cookies from 'js-cookie';
import { User } from "@/utils/model";
import { toast } from "react-toastify";
import { cookies } from "@/utils/constant";
import UserCard from "@/components/usercard";

const TopBarAdmin = () => {
  const segment = useSelectedLayoutSegment();
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
//   React.useEffect(() => {
//     const token = Cookies.get(cookies.token);
//     const identityNumber = Cookies.get(cookies.identityNumber);
//     const fullName = Cookies.get(cookies.fullName);

//     if (token && identityNumber && fullName) {
//       setUser({ token, identityNumber, fullName });
//     }else{
//       toast('Error occured, please login', { hideProgressBar: true, autoClose: 2000, type: 'error' })
//       setTimeout(() => router.replace("/login"), 2000);
//     }
//   }, []);

  const handleLogout = () => {
    Cookies.remove(cookies.token);
    Cookies.remove(cookies.identityNumber);
    Cookies.remove(cookies.fullName);
    setUser(null);
    router.replace("/login");
  };


  return (
    <div className="md:pl-64 w-full">
      <div className="flex justify-between my-6 mx-8">
        <h1 className="text-2xl font-bold">
          {`/${segment}` === "/admin"
            ? "Admin"
            : `/${segment}` === "/stocks"
            ? "Stocks"
            : "Accounts"}
        </h1>
        <UserCard name={"Admin"} handleLogout={handleLogout}/>
      </div>
    </div>
  );
};

export default TopBarAdmin;
