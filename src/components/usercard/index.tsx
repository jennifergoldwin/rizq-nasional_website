"use client";
import Image from "next/image";
import React from 'react';
import user from "../../../public/assets/icons/ic_user.png";
import Link from "next/link";

interface UserCardProps {
  name: string | undefined;
  hideOverviewPage: boolean;
  handleLogout : () => void
}

const UserCard: React.FC<UserCardProps> = ({ name, handleLogout, hideOverviewPage = true }) => {
    const [showLogout, setShowLogout] = React.useState(false);

    
    return (
        <div className="relative">
          <button
            onClick={() => setShowLogout(!showLogout)}
            className="flex items-center gap-4"
          >
            <Image src={user} alt="user" width={30} />
            <p className="text-lg">{name}</p>
            <svg
              className="w-3.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="#4DC2E8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            style={{ filter: "drop-shadow(1px 1px 5px #4DC2E8)" }}
            className={`z-10 ${
              showLogout ? "block" : "hidden"
            } bg-[#00093F] rounded-lg shadow mt-4 p-4 absolute -bottom-18 w-full`}
          >
            <div className={`${!hideOverviewPage?'hidden':"mb-2"}`}>
              <Link className={`w-full text-start `} href="/overview">Overview</Link>
            </div>
            
            <button className="w-full text-start " onClick={handleLogout}>Logout</button>
          </div>
        </div>
    )
}

export default UserCard;