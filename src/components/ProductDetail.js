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
      <div className="max-w-screen-xl mx-auto flex my-10 gap-10">
        <div className="w-2/5">
          <img
            className="h-[550px] px-10 py-10 object-cover "
            src={details.image}
            alt="ProductImage"
          ></img>
        </div>

        <div className="w-3/5">
          <div>
            <h2 className="text-4xl font-semibold font-titleFont">{details.title}</h2>
            <div className="py-5">
              <p className="text-2xl font-bold font-titleFont">${details.price}</p>
            </div>
          </div>
          <h2 className="py-5 text-2xl">Details</h2>
          <p className="text-sm font-titleFont">{details.description}</p>
          
          <div className="my-10 flex gap-10">
            <div className="p-2 w-40 flex items-center justify-between border font-titleFont text-gray-600">
                <p className="text-sm">Quantity</p>
                <div className="flex items-center gap-4">
                    <button>-</button>
                    <span>{1}</span>
                    <button>+</button>
                </div>
            </div>
            <button className="bg-red-500 text-white py-3 px-6 active:bg-red-500 hover:bg-red-400 rounded-full">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
