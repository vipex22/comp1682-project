import React from "react";
import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cart2 } from "../assets/index";
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const Cart = () => {
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(firestore, "users", userId);

        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserAddress(docSnap.data().address || "");
          }
        } catch (error) {
          console.error("Error getting user details:", error);
        }
      }
    };

    getUserDetails();
  }, []);
  const productData = useSelector((state) => state.Cart.productData);
  console.log("product amount: ", productData.length);
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    let total = 0;
    productData.map((item) => {
      total += item.productPrice * item.productQuantity;
      return total;
    });
    setTotalPrice(total.toFixed(2));
  }, [productData]);

  const renderProduct = () => {
    if (productData.length === 0) {
      return (
        <div className="max-w-screen-xl mx-auto py-20 items-center flex flex-col justify-center">
          <img className="w-28 mt-10" src={Cart2} alt="cartImg"></img>
          <p className="text-2xl font-semibold font-titleFont text-gray-300 mt-10">
            Your shopping cart is empty
          </p>
          <Link
            className="w-60 text-base text-center font-titleFont bg-red-500 text-white py-3 px-3 mt-7 mb-10 active:bg-red-500 hover:bg-red-400"
            to={"/"}
          >
            Shop Now
          </Link>
        </div>
      );
    }
    return (
      <div className="max-w-screen-xl mx-auto py-20 flex">
        <CartItem />
        <div className="w-1/3 py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-bold font-titleFont">Totals</h2>
            <p className="flex items-start gap-8 text-base">
              Address
              <span className="text-lg font-bold font-titleFont">
              {userAddress || "N/A"}
              </span>
            </p>
          </div>
          <p className="font-semibold flex justify-between mt-6 font-titleFont">
            Total payment{" "}
            <span className="text-xl font-bold">$ {totalPrice}</span>
          </p>
          <button className="bg-red-500 text-white w-full py-3 mt-5 active:bg-red-500 hover:bg-red-400">
            Purchase
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
      </div>
    );
  };

  return <div>{renderProduct()}</div>;
};

export default Cart;
