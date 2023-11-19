"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import logo from "../../../public/assets/images/logo.png";
import { IoClose, IoMenu } from "react-icons/io5";
import { ROLE, User } from "@/utils/model";
import { cookies } from "@/utils/constant";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import UserCard from "../usercard";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState("false");
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  React.useEffect(() => {
    const token = Cookies.get(cookies.token);
    const identityNumber = Cookies.get(cookies.identityNumber);
    const fullName = Cookies.get(cookies.fullName);

    if (token && identityNumber && fullName) {
      const role = ROLE.ROLE_USER;
      setUser({ token, identityNumber, fullName, role });
    } else {
      setUser(null);
      // toast('Error occured, please login', { hideProgressBar: true, autoClose: 2000, type: 'error' })
      // setTimeout(() => router.replace("/login"), 2000);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove(cookies.token);
    Cookies.remove(cookies.identityNumber);
    Cookies.remove(cookies.fullName);
    setUser(null);
    // router.replace("/login");
  };

  return (
    <nav className={` w-full z-[100] `}>
      <div className="max-w-screen-2xl md:max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-transparent ">
        <Link href="/" className="flex items-center justify-center mr-6">
          <Image
            src={logo}
            width={100}
            height={100}
            className="max-w-full"
            alt="rizq Logo"
          />
        </Link>
        <button
          onClick={() => setActiveMenu(!activeMenu)}
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className={`inline-flex items-center p-2 ml-3 text-2xl text-[#5A64C3] rounded-lg md:hidden focus:ring-2 focus:ring-[#5A64C3] ${
            activeMenu ? "" : ""
          }`}
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {activeMenu ? <IoClose /> : <IoMenu />}
        </button>
        <div
          className={`${
            activeMenu ? "block" : "hidden"
          } w-full md:flex justify-between items-center md:w-3/4 sm:text-base text-sm`}
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-normal p-2 md:p-0 mt-4 md:flex-row md:space-x-12 md:mt-0 relative">
            <li>
              <Link
                href="#introduction-page"
                className={`block py-2 pl-3 pr-4 rounded md:p-0 `}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="#why-should-invest-page"
                className={`block py-2 pl-3 pr-4 rounded md:p-0 `}
              >
                Our Approach
              </Link>
            </li>
          </ul>
          {user ? (
            <UserCard
              hideOverviewPage
              name={user.fullName}
              handleLogout={handleLogout}
            />
          ) : (
            <Link
              href="/login"
              onClick={() => setActiveMenu(false)}
              className={`flex text-white bg-[#5A64C3] border-white border-[1px] rounded-[4px] py-2 px-4 md:mx-4 font-bold justify-center gap-2`}
            >
              Login
            </Link>
          )}
          {/* {isLogin === "true" ? (
            <div className="flex gap-6 items-center justify-center  text-[#0D28A6]">
              <Link href="/history">
                <div className="rounded-full p-1.5 text-xl border border-[#0D28A666]/[0.4]">
                  <BiTime />
                </div>
              </Link>
              <Link href="/activity">
                <div className="rounded-full p-1.5 text-xl border border-[#0D28A666]/[0.4]">
                  <RiFileListLine />
                </div>
              </Link>
              <Link href="/settings">
                <div className="rounded-full p-1.5 text-xl border border-[#0D28A666]/[0.4]">
                  <FiSettings />
                </div>
              </Link>
              <div
                onClick={() => {
                  localStorage.setItem("isLogin", false);
                  router.refresh();
                }}
              >
                <Image src={avatar} alt="" />
              </div>
            </div>
          ) : (
            <Link
              href="/register"
              onClick={() => setActiveMenu(false)}
              className={`flex text-white bg-[#5CB85F] rounded-[4px] py-3 px-2 lg:mx-4 font-bold justify-center gap-2`}
            >
              Register
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
