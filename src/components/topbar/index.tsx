"use client";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import UserCard from "../usercard";
import Cookies from 'js-cookie';
import { ROLE, User } from "@/utils/model";
import { toast } from "react-toastify";
import { cookies } from "@/utils/constant";

const TopBar = () => {
  const segment = useSelectedLayoutSegment();
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);

    if (token && identityNumber && fullName) {
      const role = ROLE.ROLE_USER;
      setUser({ token, identityNumber, fullName,role });
    }else{
      toast('Error occured, please login', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      setTimeout(() => router.replace("/login"), 2000);
    }
  }, []);

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
          {`/${segment}` === "/investment"
            ? "Investment"
            : `/${segment}` === "/statements"
            ? "Statements"
            : `/${segment}` === "/account"
            ? "Account"
            : "Overview"}
        </h1>
        <UserCard hideOverviewPage={false} name={user?.fullName} handleLogout={handleLogout}/>
      </div>
    </div>
  );
};

export default TopBar;
