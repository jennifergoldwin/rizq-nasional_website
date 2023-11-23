"use client";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import UserCard from "../usercard";
import Cookies from "js-cookie";
import { ROLE, User } from "@/utils/model";
import { toast } from "react-toastify";
import { cookies } from "@/utils/constant";
import { useTranslations } from "next-intl";

const TopBar = ({ locale }: any) => {
  const segment = useSelectedLayoutSegment();
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const t = useTranslations("Overview.Sidebar");
  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);

    if (token && identityNumber && fullName) {
      const role = ROLE.ROLE_USER;
      setUser({ token, identityNumber, fullName, role });
    } else {
      toast("Error occured, please login", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
      setTimeout(() => router.push(`/${locale}/login`), 2000);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove(cookies.token);
    Cookies.remove(cookies.identityNumber);
    Cookies.remove(cookies.fullName);
    setUser(null);
    router.push(`/${locale}/login`);
  };

  return (
    <div className="md:pl-64 w-full">
      <div className="flex justify-between my-6 mx-8">
        <h1 className="text-2xl font-bold">
          {`/${segment}` === "/investment"
            ? t("investment")
            : `/${segment}` === "/statement"
            ? t("statement")
            : `/${segment}` === "/account"
            ? t("account")
            : t("overview")}
        </h1>
        <UserCard
          locale={locale}
          hideOverviewPage={false}
          name={user?.fullName}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default TopBar;
