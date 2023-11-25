import React from "react";
import { NotFoundImage } from "../assets/index";

const NotFound = () => {
  return (
    <div className="max-w-screen-xl min-h-[550px] mx-auto py-20 items-center flex flex-col justify-center">
      <img className="w-28 mt-10" src={NotFoundImage} alt="cartImg"></img>
      <p className="text-2xl font-semibold font-titleFont text-gray-300 mt-10">
        404 NOT FOUND
      </p>
    </div>
  );
};

export default NotFound;
