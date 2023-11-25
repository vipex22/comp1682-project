import React from "react";
import { Logo } from "../assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black py-10 text-white font-titleFont">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col gap-4 md:w-3/4 md:pr-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-2">
            <div className="text-sm flex gap-4 pl-2">
              <p className="hover:text-gray-300">Privacy Policy</p>
              <p className="hover:text-gray-300">Terms of Service</p>
              <p className="hover:text-gray-300">
                <Link to="/contact">Contact</Link>
              </p>
            </div>
            <p className="text-xl font-bold">©2023 University of Greenwich</p>
          </div>
        </div>
        <div className="flex items-center justify-center md:w-1/4">
          <img src={Logo} alt="logo" className="h-16" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
