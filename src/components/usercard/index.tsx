"use client";
import Image from "next/image";
import React from 'react';
import user from "../../../public/assets/icons/ic_user.png";

interface UserCardProps {
  name: string | undefined;
  handleLogout : () => void
}

const UserCard: React.FC<UserCardProps> = ({ name, handleLogout }) => {
    const [showLogout, setShowLogout] = React.useState(false);

    
    return (
        <div className="relative">
          <button
            onClick={() => setShowLogout(!showLogout)}
            className="flex items-center gap-4"
          >
            <Image src={user} alt="user" width={40} />
            <p className="text-lg">{name}</p>
            <svg
              className="w-5.5 h-2.5 ml-2.5"
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
            } bg-[#00093F] divide-y divide-gray-100 rounded-lg shadow mt-4 p-4 absolute -bottom-18 w-full`}
          >
            <button className="w-full" onClick={handleLogout}>Logout</button>
          </div>
        </div>
    )
}

export default UserCard;