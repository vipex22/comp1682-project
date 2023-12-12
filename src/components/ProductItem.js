import React from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const Navigate = useNavigate();
  const productId = product.id;
  const showDetail = () => {
    Navigate(`/product/${productId}`, {
      state: {
        items: product,
      },
    });
  };
  const productTitle =
    product.title.length > 20
      ? product.title.substring(0, 20) + "..."
      : product.title;
  return (
    <div className="group border-[1px] mx-4 my-4">
      <div
        onClick={showDetail}
        className="w-full h-50 cursor-pointer overflow-hidden md:h-80 lg:h-100"
      >
        <img
          className="w-30 h-30 px-4 py-4 mx-auto object-cover group-hover:scale-110 duration-75 "
          src={product.image}
          alt="productimage"
        ></img>
      </div>
      <div className="w-full px-2 py-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-sm font-titleFont ">
              {productTitle}
            </h2>
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
