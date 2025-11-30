import React from 'react'
import { getPayout } from '../services/payout';
import useFetch from '../hooks/useFetch';
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { GrPin } from "react-icons/gr";
import { RiHome4Fill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { MdCelebration } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa6";

export default function Payout() {
  const { isPending, error, data } = useFetch({
    queryFn: getPayout,
    key: "payout",
  });
  return (
    <div className="flex flex-col gap-10 relative ">
      <div className="flex items-center justify-between ">
        <h3 className="text-[30px] font-bold ">Your Payouts</h3>
        <div className="px-4 py-3 border border-[#F4AEFF] rounded-[16px] ">
          <select className="pr-[13px] outline-none border-none bg-transparent ">
            <option value="only-upcoming">Only Upcoming</option>
          </select>
        </div>
      </div>

      <div className=" flex flex-col gap-6 ">
        {data &&
          data.length > 0 &&
          data.map((circle, index) => (
            <div
              key={index}
              className=" flex items-center font-dm justify-between "
            >
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
                <div className="flex flex-col gap-2.5 text-[24px] ">
                  <p>{circle.amount}</p>
                  <p className="text-[16px] text-[#AAAAAA] ">{circle.name}</p>
                </div>
              </div>

              {/* Status */}
              <div
                className={` px-8 py-2 rounded-full border border-[#F4AEFF]  
                   `}
              >
                {circle.date}
              </div>

              {/* Action */}
              <div className="flex items-center gap-[25px]  ">
                {circle.pin && <GrPin />}
                <IoEllipsisHorizontalSharp />
              </div>
            </div>
          ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[390px] translate-y-1/2 ">
        <img src="/assets/Blur-oval.png" alt="" className="h-full w-full" />
      </div>
      
    </div>
  );
}
