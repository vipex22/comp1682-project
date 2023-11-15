import React from "react";
import { GWlogo } from "../assets";

const Contact = () => {
  return (
    <div className="py-10 min-h-[600px]">
      <div className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">
        Contact
      </div>
      <div className="pt-10 pb-2 max-w-screen-xl mx-auto text-2xl font-bold font-titleFont">
      For all store inquiries, please contact us below:
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
        Location: 658 Ng. Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng 550000
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
        Mobile Phone: 0236 7302 266
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
        Email: Greenwich.edu.vn
      </div>
      <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
      <img className="w-80" src={GWlogo} alt="greenwichlogo"></img>
      </div>
      
    </div>
  );
};

export default Contact;
