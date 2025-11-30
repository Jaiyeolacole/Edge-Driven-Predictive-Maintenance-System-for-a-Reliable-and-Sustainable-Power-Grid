import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router';

export default function PurpleBtn( {text, font="normal", icon, to='/'} ) {
  return (
    <Link
      to={to}
      className={`bg-[#D548EC] hover:bg-[#B83CC3] flex items-center gap-2 cursor-pointer transition ease-in-out px-[31px] py-[12px] text-white rounded-[16px] font-${font}`}
    >
      {text && <p>{text}</p>}
      {icon && icon === "rightArrow" && <FaArrowRight />}
    </Link>
  );
}
