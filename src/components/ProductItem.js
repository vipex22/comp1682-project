import React from "react";

const ProductItem = ({ product }) => {
  console.log(product);
  return (
    <div className="group border-[1px] mx-4 my-4">
      <div className="w-full h-80 cursor-pointer overflow-hidden ">
        <img
          className="w-30 h-30 px-4 py-4 object-cover group-hover:scale-110 duration-75"
          src={product.image}
          alt="productimage"
        ></img>
      </div>
      <div className="w-full px-2 py-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-titleFont ">{product.title}</h2>
          </div>
          <div className="text-sm font-bold">
            <p>${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
