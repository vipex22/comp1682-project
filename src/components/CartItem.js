import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBackLine } from "react-icons/ri";
import {
  clearCart,
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../redux/slice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const CartItem = () => {
  const productData = useSelector((state) => state.Cart.productData);
  const Dispatch = useDispatch();
  return (
    <div className="px-2 lg:pr-10">
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">
            YOUR CART
          </h2>
          <button
            onClick={() =>
              Dispatch(clearCart()) & toast.error("Your shopping cart is empty")
            }
            className="bg-red-500 text-white py-2 px-3 active:bg-red-500 hover:bg-red-400 rounded"
          >
            Clear cart
          </button>
        </div>
      </div>
      <div>
        {productData.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between mt-5 border-b-[1px] border-b-gray-400 pb-6"
          >
            <div className="px-2 flex gap-2 items-center">
              <img
                className="w-20 lg:w-32 object-cover"
                src={item.productImg}
                alt="productImage"
              ></img>
            </div>
            <h2 className="px-2 w-20 lg:w-44">{item.productTitle}</h2>
            <p className="px-2 lg:w-14">${item.productPrice}</p>
            <div className="p-2 w-28 lg:w-40 flex items-center justify-between border font-titleFont text-gray-600">
              <p className="pr-2 text-[12px] lg:text-sm">Quantity</p>
              <div className="text-[12px] lg:text-sm flex items-center gap-2 lg:gap-4">
                <button
                  onClick={() =>
                    Dispatch(
                      decreaseQuantity({
                        productId: item.productId,
                        productTitle: item.productTitle,
                        productImg: item.productImg,
                        productPrice: item.productPrice,
                        productDes: item.productDes,
                        productQuantity: 1,
                      })
                    )
                  }
                >
                  -
                </button>
                <span>{item.productQuantity}</span>
                <button
                  onClick={() =>
                    Dispatch(
                      increaseQuantity({
                        productId: item.productId,
                        productTitle: item.productTitle,
                        productImg: item.productImg,
                        productPrice: item.productPrice,
                        productDes: item.productDes,
                        productQuantity: 1,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
            <p className="px-2 w-14 text-[14px] lg:text-base">
              ${(item.productQuantity * item.productPrice).toFixed(2)}
            </p>
            <RiDeleteBackLine
              onClick={() =>
                Dispatch(deleteProduct(item.productId)) &
                toast.error(`${item.productTitle} has been removed`)
              }
              className="pl-2 w-24 lg:w-32 text-xl hover:text-red-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
