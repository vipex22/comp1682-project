import React, { useState, useEffect } from "react";
import { Cart, Logo } from "../assets/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { AdminIcon } from "../assets/index";
import { RiHome3Line } from "react-icons/ri";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TbShoppingBagCheck } from "react-icons/tb";
import { MdOutlineInsertChart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const isAdminValue = await getUserDetail(user.uid, "isAdmin");
        setIsAdmin(isAdminValue === true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <div className="w-full h-20 bg-black sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between font-titleFont md:px-2">
        <div className="lg:hidden w-1/3 pl-10">
          <button
            className="text-white p-2"
            onClick={() => setShowDrawer(!showDrawer)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 h-screen w-full ${
            showDrawer ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-end p-4">
            <button className="text-white" onClick={() => setShowDrawer(false)}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center text-white">
            <Link
              to={"/"}
              className="text-3xl font-titleFont hover:text-gray-300 py-2 flex"
            >
              {" "}
              <RiHome3Line />
              Home
            </Link>
            {!isAdmin && (
              <Link
                to="/products"
                className="text-3xl font-titleFont hover:text-gray-300 py-2 flex"
              >
                <MdOutlineShoppingBag />
                Products
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/manageorders"
                className="text-3xl font-titleFont hover:text-gray-300 py-2 flex"
              >
                <TbShoppingBagCheck />
                Orders
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/manageproducts"
                className="text-3xl font-titleFont hover:text-gray-300 py-2 flex"
              >
                <MdOutlineShoppingBag />
                Products
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/dashboard"
                className="text-3xl font-titleFont hover:text-gray-300 py-2 flex"
              >
                <MdOutlineInsertChart />
                Dashboard
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/manageusers"
                className="text-3xl font-titleFont hover:text-gray-300 py-2 flex"
              >
                <FaRegUser />
                UsersInfo
              </Link>
            )}
          </div>
        </div>
        <div className="w-1/3 hidden lg:flex h-full items-center">
          <ul className="flex gap-4 items-center justify-start md:gap-8 ">
            <li className="text-white text-base hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
              <Link to={"/"}>Home</Link>
            </li>
            {!isAdmin && (
              <Link to="/products">
                <li className="text-white text-base hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                  Products
                </li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/manageorders">
                <li className="text-white text-base hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                  Orders
                </li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/manageproducts">
                <li className="text-white text-base hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                  Products
                </li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/dashboard">
                <li className="text-white text-base hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                  Dashboard
                </li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/manageusers">
                <li className="text-white text-base hover:text-gray-300 hover:underline decoration-[3px] underline-offset-8">
                  UsersInfo
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div className="flex justify-center w-24">
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
              <p className="text-white text-lg mr-2 hidden lg:flex h-full items-center">
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
