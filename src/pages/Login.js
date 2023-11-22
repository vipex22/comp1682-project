import React from "react";
import { GoogleIcon, ShopVerticalImg } from "../assets";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-300 font-titleFont">
      <div class="relative flex flex-col m-6 space-y-8 bg-white rounded-2xl md:flex-row md:space-y-0">
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="text-4xl font-bold mb-3 ">Login</span>
          <span class="text-gray-500 mb-10">
            Welcome! Please login to continue shopping!
          </span>
          <button
            onClick={handleGoogleSignIn}
            class="w-full border border-gray-300 p-2 rounded-lg mb-10 hover:bg-black hover:text-white"
          >
            <img src={GoogleIcon} alt="img" class="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          <div class="text-center text-gray-500">
            Don't have an account?
            <span class="font-bold text-black"> Sign up</span>
          </div>
        </div>
        <div class="relative">
          <img
            src={ShopVerticalImg}
            alt="img"
            class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
};

export default Login;
