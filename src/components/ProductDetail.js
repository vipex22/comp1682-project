import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const [details, setDetails] = useState({});
  const Location = useLocation();
  useEffect(() => {
    setDetails(Location.state.items);
  }, []);
  return (
    <div>
      <div className="max-w-screen-xl mx-auto flex my-10 ">
        <div>
          <img
            className="w-full px-10 py-10 border-[5px]"
            src={details.image}
            alt="ProductImage"
          ></img>
        </div>
        <div className="pl-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold font-titleFont">
            {details.title}
          </h2>
          <div className="my-5">
            <p className="text-2xl font-semibold font-title">
              ${details.price}
            </p>
          </div>
          <h2 className="py-5 text-2xl">Details</h2>
          <p className="text-sm font-titleFont text-gray-500">
            {details.description}
          </p>
          <div className="my-10 flex gap-10">
            <div className="p-2 w-48 flex items-center justify-between border font-titleFont text-gray-600">
                <p className="text-sm">Quantity</p>
                <div className="flex items-center gap-4">
                    <button>-</button>
                    <span>{1}</span>
                    <button>+</button>
                </div>
            </div>
            <button className="bg-red-500 text-white py-3 px-6 active:bg-red-500 hover:bg-red-400">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
