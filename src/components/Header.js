// Header.js
import React, { useState, useEffect } from "react";
import { Cart, Logo } from "../assets/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../firebase";

const Header = () => {
  const productInCart = useSelector((state) => state.Cart.productData);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-20 bg-black sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between font-titleFont ">
        <div>
          <ul className="flex gap-8 items-center">
            <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
              <Link to={"/"}>Home</Link>
            </li>
            <Link to="/products">
              <li className="text-white text-xl hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                Products
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <Link>
            <img className="w-28" src={Logo} alt="logo"></img>
          </Link>
        </div>

        <div className="flex gap-8 items-center">
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
                {user.displayName || "User"}
              </p>
              <Link to="/profile">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.photoURL}
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
