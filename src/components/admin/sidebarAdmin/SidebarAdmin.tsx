/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { IoMdClose } from "react-icons/io";
import logo from "../../../../public/assets/images/logo.png";
import Cookies from "js-cookie";
import { RiRefund2Line, RiPieChart2Fill, RiAdminFill } from "react-icons/ri";
import { cookiesAdmin, roleType } from "@/utils/constant";
import { ROLE } from "@/utils/model";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const SidebarAdmin = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const segment = useSelectedLayoutSegment();
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    const role = Cookies.get(cookiesAdmin.role) || "";
    setRole(role);
  }, [role]);

  const sidebarOptions = [
    {
      name: "Accounts",
      href: "/accounts",
      icon: "/assets/icons/ic_profile.png",
      iconSelected: "/assets/icons/ic_profile_blue.png",
      current: !segment ? true : false,
    },

    role === "ROLE_MASTER_ADMIN"
      ? {
          name: "Admins",
          href: "/accounts/admin",
          icon: "/assets/icons/ic_profile.png",
          iconSelected: "/assets/icons/ic_profile_blue.png",
          current: `/${segment}` === "/admin" ? true : false,
        }
      : null,
    {
      name: "Stocks",
      href: "/accounts/stocks",
      icon: "/assets/icons/ic_investment.png",
      iconSelected: "/assets/icons/ic_investment_blue.png",
      current: `/${segment}` === "/stocks" ? true : false,
    },
  ].filter(Boolean);

  return (
    <>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <div className="bg-[#01115E] p-2">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </div>
      </button>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 min-h-screen h-full transition-transform md:translate-x-0  ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#01115E] ">
          <div className="flex justify-between items-center pl-2.5 mb-5">
            <Image src={logo} priority alt="" width={100} />
            <button onClick={() => setShowSidebar(!showSidebar)}>
              <IoMdClose size={30} className="md:hidden" />
            </button>
          </div>
          <ul className="space-y-2 font-medium">
            {sidebarOptions.map((option) =>
              option !== null ? (
                <li key={option.name}>
                  <Link
                    href={option.href}
                    className={classNames(
                      option.current ? "text-[#4DC2E8]" : "text-white"
                    )}
                  >
                    <div className="flex items-center text-lg">
                      <img
                        src={classNames(
                          option.current ? option.iconSelected : option.icon
                        )}
                        alt=""
                        className="w-[35px] h-[35px] m-4"
                      />
                      {option.name}
                    </div>
                  </Link>
                </li>
              ) : (
                <div key={"lala"} />
              )
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
