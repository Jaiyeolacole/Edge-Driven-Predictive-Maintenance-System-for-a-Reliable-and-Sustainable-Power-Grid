import React from 'react'
import { PiHamburgerFill } from "react-icons/pi";

export default function TransBtn({ text, icon, action }) {
  return (
    <div
      className="border border-[#F4AEFF] rounded-[16px] px-10 py-4 flex items-center gap-3 cursor-pointer "
      onClick={() => action()}
    >
      {icon && icon === "hamburger" && (
        <img
          src="/assets/hamburger.png"
          alt="hamburger"
          className="w-[31px] h-[31px]"
        />
      )}
      <p>{text}</p>
    </div>
  );
}
