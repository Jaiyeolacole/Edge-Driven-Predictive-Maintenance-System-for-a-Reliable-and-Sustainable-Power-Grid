import React from 'react'
import { TbArrowRightFromArc } from "react-icons/tb";
import { CiGrid42 } from "react-icons/ci";
import { PiCirclesThreeBold } from "react-icons/pi";
import { MdOutlineCreditCard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";

import { Link, Outlet, useLocation, useNavigate } from 'react-router'

export default function Layout() {
  const location = useLocation();

  const navigate = useNavigate();
  
  return (
    <div className="flex gap-[68px] h-screen text-[21px] font-dm ">
      {/* Sidebar */}
      <div
        className="w-[306px] p-10 h-full flex flex-col gap-[50px]"
        style={{
          background: "linear-gradient(to bottom, #111111 80%, #f2b4f8 100%)",
        }}
      >
        <header className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-[25px] h-[25px] "
          />
          <h3 className="">Chaincircle</h3>
        </header>

        <div className="flex-1 flex flex-col gap-10">
          <Link
            to={"/layout/dashboard"}
            className={`py-2 px-4 rounded-[8px] flex items-center transition-all ease-in-out gap-4 w-full text-white ${
              location.pathname === "/layout" ||
              location.pathname === "/layout/dashboard"
                ? "bg-[#D548EC] hover:bg-[#B83CC3]"
                : "bg-transparent hover:bg-[#D548EC]"
            } `}
          >
            <CiGrid42 size={32} className="text-[#aaa] " />
            <p>Dashboard</p>
          </Link>
          <Link
            to={"/layout/circle"}
            className={`py-2 px-4 rounded-[8px] flex items-center transition-all ease-in-out gap-4 w-full text-white ${
              location.pathname === "/layout/circle"
                ? "bg-[#D548EC] hover:bg-[#B83CC3]"
                : "bg-transparent hover:bg-[#D548EC]"
            } `}
          >
            <PiCirclesThreeBold size={32} className="text-[#aaa] " />
            <p>Circle</p>
          </Link>
          <Link
            to={"/layout/payout"}
            className={`py-2 px-4 rounded-[8px] flex items-center transition-all ease-in-out gap-4 w-full text-white ${
              location.pathname === "/layout/payout"
                ? "bg-[#D548EC] hover:bg-[#B83CC3]"
                : "bg-transparent hover:bg-[#D548EC]"
            } `}
          >
            <MdOutlineCreditCard size={32} className="text-[#aaa] " />
            <p>Payouts</p>
          </Link>
          <Link
            to={"/layout/profile"}
            className={`py-2 px-4 rounded-[8px] flex items-center transition-all ease-in-out gap-4 w-full text-white ${
              location.pathname === "/layout/profile"
                ? "bg-[#D548EC] hover:bg-[#B83CC3]"
                : "bg-transparent hover:bg-[#D548EC]"
            } `}
          >
            <FaRegUserCircle size={32} className="text-[#aaa] " />
            <p>Profile</p>
          </Link>
        </div>

        <div
          onClick={() => navigate("/")}
          className={`p-2 rounded-[8px] flex items-center gap-4 w-full justify-center cursor-pointer `}
        >
          <TbArrowRightFromArc size={32} />
          <p>Log out</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto h-full flex flex-col gap-10 px-20 py-10">
        <div className="ml-auto w-fit flex items-center gap-4 ">
          <div className="relative">
            <FaRegBell size={40} />
            <div className="absolute rounded-full w-4 h-4 bg-[#DB0000] top-2 right-2 "></div>
          </div>
          <div className="flex items-center gap-1.5 ">
            <img
              src="/assets/User-pic.png"
              alt="profile"
              className="w-[40px] h-[40px] rounded-full"
            />
            <p className="font-dm text-[24px] "> Winszn </p>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
