import React from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { RiHome4Fill } from "react-icons/ri";
import { PiCirclesThreeBold } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { MdCelebration } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import DashboardTable from '../Pages/Dashboard/DashboardTable';

export default function Dashboard() {
    const [showBalance, setShowBalance] = React.useState(true);
  return (
    <div className="h-full overflow-auto flex flex-col gap-10 ">
      <header
        className="px-6 py-4 rounded-[16px] flex flex-col items-center gap-3 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/dashboard-bg-card.png')" }}
      >
        <div className="flex flex-col items-center gap-1 ">
          <p className="font-dm text-[16px] ">Total Saved</p>
          <div className="flex items-center gap-2 ">
            <h3 className="font-bold text-[40px] ">
              {showBalance ? "$9,830.62" : "******"}
            </h3>
            <div
              className="cursor-pointer"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>
        </div>

        {/* Stroke */}
        <div className="w-full h-[1px] bg-white "></div>

        <div className="flex items-center gap-4 w-full ">
          <div className="flex-1 flex items-center justify-center rounded-[8px] gap-2 px-5 py-2 bg-[#853094] text-[16px] font-dm ">
            <PiCirclesThreeBold className="text-[#AEFFDA]  " size={24} />
            <p>17 active circles</p>
          </div>
          <div className="flex-1 flex items-center justify-center rounded-[8px] gap-2 px-5 py-2 bg-[#853094] text-[16px] font-dm ">
            <img src="/assets/money-interest.png" alt="" className="w-6 h-6" />
            <p>$604 interest earned</p>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-5">
        <h3 className="font-dm text-[21px] ">Active Circles</h3>

        <div className="flex items-center font-dm text-[16px] gap-10 w-full  ">
          <div className="flex flex-col gap-[11px] justify-center items-center ">
            <div className="w-[102px] h-[102px] bg-[#CCE0FF] rounded-full flex items-center justify-center ">
              <RiHome4Fill color="#4887EC" size={33} />
            </div>
            <p className="text-center">Dream Home Squad</p>
          </div>
          <div className="flex flex-col gap-[11px] justify-center items-center ">
            <div className="w-[102px] h-[102px] bg-[#FFE8CC] rounded-full flex items-center justify-center ">
              <FaCar color="#EC9D48" size={33} />
            </div>
            <p className="text-center">Project G-Wagond</p>
          </div>
          <div className="flex flex-col gap-[11px] justify-center items-center ">
            <div className="w-[102px] h-[102px] bg-[#ffcccc] rounded-full flex items-center justify-center ">
              <FaFaceSmileBeam color="#EC4848" size={33} />
            </div>
            <p className="text-center">Our incoming heir</p>
          </div>
          <div className="flex flex-col gap-[11px] justify-center items-center ">
            <div className="w-[102px] h-[102px] bg-[#D9FFCC] rounded-full flex items-center justify-center ">
              <MdCelebration color="#48EC4D" size={33} />
            </div>
            <p className="text-center">Detty December</p>
          </div>
          <div className="flex flex-col gap-[11px] justify-center items-center ">
            <div className="w-[102px] h-[102px] bg-[#F6CCFF] rounded-full flex items-center justify-center ">
              <FaUserAstronaut color="#B848EC" size={33} />
            </div>
            <p className="text-center">Next Elon Musks</p>
          </div>
          <div className="flex flex-col gap-[11px] justify-center items-center ">
            <div className="w-[102px] h-[102px] shadow-lg shadow-[#3d3d3e] rounded-full flex items-center justify-center ">
              <FaPlus color="#3d3d3e" size={33} />
            </div>
            <p className="text-center text-primary">Create New</p>
          </div>
        </div>
      </section>
      <DashboardTable />
    </div>
  );
}
