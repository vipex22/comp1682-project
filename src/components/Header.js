import React, { useState, useEffect } from "react";
import { Cart, Logo } from "../assets/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth, firestore } from "../firebase";
import {doc, getDoc } from "firebase/firestore";
import { AdminIcon } from "../assets/index";
const Header = () => {
  const productInCart = useSelector((state) => state.Cart.productData);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUserDetail = async (uid, field) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()[field];
      }

      return "";
    } catch (error) {
      console.error("Error getting user details:", error);
      return "";
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      setUser(user);
      if (user) {
        const isAdminValue = await getUserDetail(user.uid, "isAdmin");
        setIsAdmin(isAdminValue === true);
        console.log("isAdmin:", isAdminValue);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <div className="w-full h-20 bg-black sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between font-titleFont ">
        <div className="w-1/3">
          <ul className="flex gap-8 items-center justify-start">
            <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
              <Link to={"/"}>Home</Link>
            </li>
            {!isAdmin && (
              <Link to="/products">
              <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                Products
              </li>
            </Link>
            )}
            {isAdmin && (
              <Link to="/manageorders">
                <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                  Orders
                </li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/manageproducts">
                <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                 Products
                </li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/dashboard">
                <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                 Dashboard
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div className="flex justify-center w-1/3">
          <Link>
            <img className="w-28" src={Logo} alt="logo"></img>
          </Link>
        </div>

        <div className="flex gap-8 items-center justify-end w-1/3">
          <Link to="/cart">
            <div className="relative">
              <img className="w-8" src={Cart} alt="cart"></img>
              <span className="text-white absolute w-5 top-1 left-2 text-xs flex items-center justify-center font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {productInCart.length}
              </span>
            </div>
          </Link>

          {user ? (
            <div className="flex items-center">
              <p className="text-white text-xl mr-2">
                {user.displayName || "Admin"}
              </p>
              <Link to="/profile">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.photoURL || AdminIcon}
                  alt="userLogo"
                />
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <p1 className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                Login
              </p1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
