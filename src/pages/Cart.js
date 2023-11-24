import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cart2 } from "../assets/index";
import { auth, firestore } from "../firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cart = () => {
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [payWithStripe, setPayWithStripe] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(firestore, "users", userId);

        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserAddress(docSnap.data().address || "");
            setUserPhoneNumber(docSnap.data().phoneNumber || "");
            setUserEmail(auth.currentUser.email || "");
          }
        } catch (error) {
          console.error("Error getting user details:", error);
        }
      }
    };

    getUserDetails();
  }, []);

  const productData = useSelector((state) => state.Cart.productData);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    let total = 0;
    productData.map((item) => {
      total += item.productPrice * item.productQuantity;
      return total;
    });
    setTotalPrice(total.toFixed(2));
  }, [productData]);

  const handleCheckout = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const orderRef = await addDoc(collection(firestore, `users/${user.uid}/orders`), {
          date: serverTimestamp(),
          products: productData.map((item) => ({
            productTitle: item.productTitle,
            quantity: item.productQuantity,
            price: item.productPrice,
            totalPrice: item.productPrice * item.productQuantity,
          })),
          statusPayment: "Pending",
        });

        setPayWithStripe(true);

      } catch (error) {
        console.error("Error creating order:", error);
      }
    } else {
      toast.error("Please sign in to purchase");
    }
  };

  const stripeToken = async (token) => {
    const paymentDetails = {
      amount: totalPrice * 100,
      token: token,
      userEmail: userEmail,
      userPhoneNumber: userPhoneNumber,
      userAddress: userAddress,
      products: productData
        .map((item) => `${item.productTitle} (${item.productQuantity})`)
        .join(", "),
    };

    await axios.post("http://localhost:8000/paywithstripe", paymentDetails);
  };

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
            <p className="flex items-start gap-8 text-base">
              Phone Number
              <span className="text-lg font-bold font-titleFont">
                {userPhoneNumber || "N/A"}
              </span>
            </p>
          </div>
          <p className="font-semibold flex justify-between mt-6 font-titleFont">
            Total payment{" "}
            <span className="text-xl font-bold">$ {totalPrice}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="bg-red-500 text-white w-full py-3 mt-5 active:bg-red-500 hover:bg-red-400"
          >
            Purchase
          </button>
          {payWithStripe && (
            <div className="mt-5 justify-center flex items-center">
              <StripeCheckout
                stripeKey="pk_test_51OFtylK2wvpPmzzvKfOXYImCxvl1ZpVVKRqZOBNpeycJu1e4bpT09meUrFUpl0vxcAp6mlCTa5J09XwJLqZNgrKD00KplKHOFg"
                name="GWFashion"
                description={`Your Payment total is $${totalPrice}`}
                amount={totalPrice * 100}
                label="Pay With Stripe"
                email={userEmail}
                token={stripeToken}
              />
            </div>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
      </div>
    );
  };

  return <div>{renderProduct()}</div>;
};

export default Cart;
