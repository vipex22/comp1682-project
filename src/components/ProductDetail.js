import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ProductDetail = () => {
  const [details, setDetails] = useState({});
  const Location = useLocation();
  useEffect(() => {
    setDetails(Location.state.items);
  }, [Location.state.items]);
  const Dispatch = useDispatch();
  let [Quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-screen-xl mx-auto my-10 p-4 md:p-8">
      <div className="md:flex items-center">
        <div className="md:w-2/5 mb-4 md:mb-0">
          <img
            className="w-full h-auto md:h-[550px] object-cover"
            src={details.image}
            alt="ProductImage"
          ></img>
        </div>

        <div className="md:w-3/5 md:pl-8">
          <h2 className="text-2xl md:text-4xl font-semibold font-titleFont mb-2">
            {details.title}
          </h2>
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-bold font-titleFont">
              ${details.price}
            </p>
          </div>

          <h2 className="text-xl md:text-2xl mb-2">Details</h2>
          <p className="text-sm md:text-base font-titleFont mb-4">
            {details.description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
            <div className="p-2 w-40 md:w-48 flex items-center justify-between border font-titleFont text-gray-600">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setQuantity(Quantity === 1 ? 1 : Quantity - 1)
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
