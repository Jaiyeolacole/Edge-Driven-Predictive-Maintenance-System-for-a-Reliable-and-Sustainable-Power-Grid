import React from 'react'
import { FiSearch } from "react-icons/fi";
import useFetch from '../hooks/useFetch';
import { getCircles } from '../services/circleAPI';
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { GrPin } from "react-icons/gr";
import { RiHome4Fill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { MdCelebration } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

export default function Circle() {
  const {isPending, error, data} = useFetch({queryFn: getCircles, key: 'circles'});
  return (
    <div className="flex flex-col gap-10 relative ">
      <div className="flex items-center justify-between ">
        <h3 className="text-[30px] font-bold ">Active Circles</h3>
        <div className="w-[418px] flex items-center gap-[13px] border px-4 py-3 rounded-[16px] border-[#F4AEFF] ">
          <FiSearch size={32} />
          <input
            type="text"
            className="border-none outline-none  flex-1 "
            placeholder="Search for a circle"
          />
        </div>
      </div>

      <div className=" flex flex-col gap-6 ">
        {data &&
          data.length > 0 &&
          data.map((circle, index) => (
            <div key={index} className=" flex items-center justify-between ">
              <div className={`flex items-center gap-6`}>
                <div
                  className={` w-[102px] h-[102px] rounded-full flex items-center text-[33px] justify-center ${
                    circle.name === "Dream House Squad"
                      ? "bg-[#CCE0FF] text-[#4887EC]"
                      : circle.name === "Project G-Wagon"
                      ? "bg-[#FFE8CC] text-[#EC9D48] "
                      : circle.name === "Our incoming heir"
                      ? "bg-[#FFCCCC] text-[#EC4848] "
                      : circle.name === "Detty December"
                      ? "bg-[#D9FFCC] text-[#48EC4D] "
                      : "bg-[#F6CCFF] text-[#B848EC] "
                  } `}
                >
                  {circle.name === "Dream House Squad" ? (
                    <RiHome4Fill />
                  ) : circle.name === "Project G-Wagon" ? (
                    <FaCar />
                  ) : circle.name === "Our incoming heir" ? (
                    <FaFaceSmileBeam />
                  ) : circle.name === "Detty December" ? (
                    <MdCelebration />
                  ) : circle.name === "Next Elon Musks" ? (
                    <FaUserAstronaut />
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col gap-2.5  ">
                  <p className="text-[24px]">{circle.name}</p>
                  <div className="flex items-center gap-2 ">
                    <div className="border p-1 w-[147px] h-[26px] rounded-[4px] border-[#F4AEFF] ">
                      <div
                        className="bg-[#D548EC] h-full rounded-[2px]"
                        style={{ width: `${circle.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-[16px]">{circle.percentage}%</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div
                className={` px-8 py-2 rounded-full ${
                  circle.type === "On track"
                    ? "border border-[#F4AEFF] "
                    : "border border-[#FFBDBD] text-[#FFBDBD] "
                } `}
              >
                {circle.type}
              </div>

              {/* Action */}
              <div className="flex items-center gap-[25px]  ">
                {circle.pin && <GrPin />}
                <IoEllipsisHorizontalSharp />
              </div>
            </div>
          ))}
      </div>

      <div className="ml-auto px-4 py-2 rounded-[8px] bg-[#D548EC] cursor-pointer ">
        <FaPlus size={40} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[390px] translate-y-1/2 ">
          <img src="/assets/Blur-oval.png" alt="" className="h-full w-full" />
      </div>
    </div>
  );
}
