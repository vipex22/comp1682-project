import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice";
import { ToastContainer, toast } from "react-toastify";

const ProductDetail = () => {
  const [details, setDetails] = useState({});
  const Location = useLocation();
  useEffect(() => {
    setDetails(Location.state.items);
  }, []);
  const Dispatch = useDispatch();
  let [Quantity, setQuantity] = useState(1);
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
            <h2 className="text-4xl font-semibold font-titleFont">
              {details.title}
            </h2>
            <div className="py-5">
              <p className="text-2xl font-bold font-titleFont">
                ${details.price}
              </p>
            </div>
          </div>
          <h2 className="py-5 text-2xl">Details</h2>
          <p className="font-bold font-titleFont">
            Category: {details.category}
          </p>
          <p className="text-sm font-titleFont">{details.description}</p>

          <div className="my-10 flex gap-10">
            <div className="p-2 w-40 flex items-center justify-between border font-titleFont text-gray-600">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setQuantity(Quantity === 1 ? (Quantity = 1) : Quantity - 1)
                  }
                >
                  -
                </button>
                <span>{Quantity}</span>
                <button onClick={() => setQuantity(Quantity + 1)}>+</button>
              </div>
            </div>
            <button
              onClick={() =>
                Dispatch(
                  addToCart({
                    productId: details.id,
                    productTitle: details.title,
                    productImg: details.image,
                    productPrice: details.price,
                    productDes: details.description,
                    productQuantity: Quantity,
                  })
                ) &
                toast.success(
                  `${Quantity} ${details.title} added to your shopping cart!`
                )
              }
              className="bg-red-500 text-white py-3 px-6 active:bg-red-500 hover:bg-red-400 rounded-full"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
};

export default ProductDetail;
