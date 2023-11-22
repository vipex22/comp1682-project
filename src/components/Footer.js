import React from "react";
import { Logo } from "../assets";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-black py-10 text-white font-titleFont">
      <div className="max-w-screen-xl mx-auto grid grid-cols-4">
        <div className="flex flex-col gap-8">
          <div className="text-sm flex gap-8">
            <p className="hover:text-gray-300">Privacy Policy</p>
            <p className="hover:text-gray-300">Terms of Service</p>
            <p className="hover:text-gray-300">
              {" "}
              <Link to="/contact">Contact</Link>
            </p>
          </div>
          <p className="text-xl font-bold">©2023 University of Greenwich</p>
        </div>
        <div></div>
        <div></div>
        <img className="mx-auto w-28" src={Logo} alt="logo"></img>
      </div>
    </div>
  );
};

export default Footer;
