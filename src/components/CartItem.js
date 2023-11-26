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
    <div className="w-2/3 pr-10">
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
            <div className="flex gap-2 items-center">
              <img
                className="w-32 h32 object-cover"
                src={item.productImg}
                alt="productImage"
              ></img>
            </div>
            <h2 className="w-52">{item.productTitle}</h2>
            <p className="w-10">${item.productPrice}</p>
            <div className="p-2 w-40 flex items-center justify-between border font-titleFont text-gray-600">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4">
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
            <p className="w-14">
              ${(item.productQuantity * item.productPrice).toFixed(2)}
            </p>
            <RiDeleteBackLine
              onClick={() =>
                Dispatch(deleteProduct(item.productId)) &
                toast.error(`${item.productTitle} has been removed`)
              }
              className="text-xl hover:text-red-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
