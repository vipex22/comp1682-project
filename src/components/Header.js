import React from "react";
import { Cart, Logo, UserAvatar } from "../assets/index";

const Header = () => {
  return (
    <div className="w-full h-20 bg-black">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between font-titleFont">
        <div>
          <ul className="flex gap-8 items-center">
            <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
              Home
            </li>
            <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
              Products
            </li>
          </ul>
        </div>
        <div>
          <img className="w-28" src={Logo} alt="logo"></img>
        </div>

        <div className="flex gap-8 items-center">
          <div className="relative">
            <img className="w-8" src={Cart} alt="cart"></img>
            <span className="text-white absolute w-5 top-1 left-2 text-xs flex items-center justify-center font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              0
            </span>
          </div>
          <p1 className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
            Register/Login
          </p1>
          {/* <img className="w-8 h-8 rounded-full" src={UserAvatar} alt="userLogo"></img> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
