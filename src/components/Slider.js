import React, { useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { Banner1, Banner2, Banner3 } from "../assets";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [Banner1, Banner2, Banner3];
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-screen h-[320px] relative md:h-[450px] lg:h-[670px]">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000"
        >
          <img
            className="w-screen h-full object-cover"
            src={data[0]}
            alt="slider"
            loading="priority"
          ></img>
          <img
            className="w-screen h-full object-cover"
            src={data[1]}
            alt="slider"
            loading="priority"
          ></img>
          <img
            className="w-screen h-full object-cover"
            src={data[2]}
            alt="slider"
            loading="priority"
          ></img>
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-4 lg:bottom-16">
          <div onClick={prevSlide} className="hover:text-gray-500">
            <MdOutlineArrowBackIos />
          </div>
          <div onClick={nextSlide} className="hover:text-gray-500">
            <MdOutlineArrowForwardIos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
