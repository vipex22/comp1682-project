import React, { useState } from "react";
import { ShopVerticalImg } from "../assets";
import { auth, firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  const handleAdminSignIn = async () => {
    const { email, password } = adminCredentials;
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(firestore, "users", result.user.uid);
      await setDoc(userRef, { isAdmin: true, email: email }, { merge: true });
      navigate("/");
    } catch (error) {
      toast.error("Incorrect admin credentials!");
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdminSignIn();
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-300 font-titleFont"
      onKeyDown={handleKeyPress}
    >
      <div className="relative flex flex-col m-6 space-y-8 bg-white rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="text-4xl font-bold mb-3 ">Admin Login</span>
          <span className="text-gray-500 mb-10">Welcome!</span>
          <div className="py-2">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              onChange={handleAdminInputChange}
            />
          </div>
          <div className="py-2">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="password"
              onChange={handleAdminInputChange}
            />
          </div>
          <button
            onClick={handleAdminSignIn}
            className="mt-10 w-full border border-gray-300 p-2 rounded-lg mb-10 hover:bg-black hover:text-white"
          >
            Sign in
          </button>
        </div>
        <div className="relative">
          <img
            src={ShopVerticalImg}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
};

export default AdminLogin;
