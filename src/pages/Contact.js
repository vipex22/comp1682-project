import React from "react";
import { GWlogo } from "../assets";

const Contact = () => {
  return (
    <div className="py-10 min-h-[600px]">
      <div className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] text-center">
        Contact
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-xl font-titleFont text-center">
        For all store inquiries, please contact us below:
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-lg font-titleFont text-center">
        Location: 658 Ng. Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng 550000
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-lg font-titleFont text-center">
        Mobile Phone: 0236 7302 266
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-lg font-titleFont text-center">
        Email: Greenwich.edu.vn
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-center">
        <img className="w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto" src={GWlogo} alt="greenwichlogo"></img>
      </div>
    </div>
  );
};

export default Contact;
