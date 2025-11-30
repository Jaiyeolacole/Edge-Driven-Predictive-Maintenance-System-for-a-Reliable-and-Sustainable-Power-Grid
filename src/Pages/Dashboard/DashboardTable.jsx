import React from 'react'
import useFetch from '../../hooks/useFetch';
import { getRecentActivities } from '../../services/recentActivitiesAPI';
import { MdOutlineArrowOutward } from "react-icons/md";
import { FiArrowDownLeft } from "react-icons/fi";
import { FaSackDollar } from "react-icons/fa6";

export default function DashboardTable() {
    const { isPending, error, data } = useFetch({ queryFn: getRecentActivities, key: 'dashboard-table' });
    console.log(data);
    
  return (
    <div className="p-6 flex flex-col gap-6 text-[24px] font-dm ">
      <p>Recent Activity</p>

      <div>
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <div
              className={`flex justify-between items-center py-4 ${
                index !== data.length - 1 ? "border-b border-b-[#D9D9D9]" : ""
              }`}
              key={index}
            >
              <div className="flex items-center gap-4 ">
                <div className="h-20 w-20 rounded-full border border-[#333333] flex items-center justify-center ">
                  {item.type === "save" && (
                    <MdOutlineArrowOutward className="text-[#87698C]" />
                  )}
                  {item.type === "withdraw" && (
                    <FiArrowDownLeft className="text-[#87698C]" />
                  )}
                  {item.type === "interest" && (
                    <FaSackDollar className="text-[#698C74]" />
                  )}
                </div>
                <div className="">
                  <p>{item.title}</p>
                  <p className="text-[12px]">{item.timeAgo}</p>
                </div>
              </div>
              <div className="text-[24px] text-primary ">
                <p>{item.amount}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
