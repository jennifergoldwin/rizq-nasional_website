"use client";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import Cookies from 'js-cookie';
import { User } from "@/utils/model";
import { toast } from "react-toastify";
import { cookiesAdmin } from "@/utils/constant";
import UserCard from "@/components/usercard";

const TopBarAdmin = () => {
  const segment = useSelectedLayoutSegment();
  const [nameAdmin, setNameAdmin] = React.useState<string>("");
  const router = useRouter();
  React.useEffect(() => {
    const fullName = Cookies.get(cookiesAdmin.fullName) || "";

    if (fullName!=="") {
      setNameAdmin(fullName);
    }else{
      toast('Error occured, please login', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      setTimeout(() => router.replace("/login-admin"), 2000);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove(cookiesAdmin.token);
    Cookies.remove(cookiesAdmin.username);
    Cookies.remove(cookiesAdmin.fullName);
    Cookies.remove(cookiesAdmin.role);
    setNameAdmin("");
    router.replace("/login-admin");
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
        <UserCard hideOverviewPage={true} name={nameAdmin} handleLogout={handleLogout}/>
      </div>
    </div>
  );
};

export default TopBarAdmin;
