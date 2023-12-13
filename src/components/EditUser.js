import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = ({ user, onClose }) => {
  const [isAdmin, setIsAdmin] = useState(user ? user.isAdmin || false : false);
  const [email, setEmail] = useState(user ? user.email || "" : "");
  const [phoneNumber, setPhoneNumber] = useState(
    user ? user.phoneNumber || "" : ""
  );
  const [address, setAddress] = useState(user ? user.address || "" : "");
  const [sex, setSex] = useState(user ? user.sex || "" : "");
  const [dob, setDob] = useState(user ? user.dob || "" : "");

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin || false);
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setAddress(user.address || "");
      setSex(user.sex || "");
      setDob(user.dob || "");
    }
  }, [user]);

  const handleEditUser = async () => {
    try {
      const userDocRef = doc(firestore, "users", user.id);
      await updateDoc(userDocRef, {
        isAdmin,
        email,
        phoneNumber,
        address,
        sex,
        dob,
      });

      toast.success("User details updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-80 p-4 mt-12 rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <button
            onClick={onClose}
            className="bg-gray-300 rounded-full w-6 h-6 justify-center items-center"
          >
            X
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="isAdmin"
              className="block text-sm font-medium text-gray-600"
            >
              isAdmin
            </label>
            <input
              type="isAdmin"
              id="isAdmin"
              name="isAdmin"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setIsAdmin(e.target.value === "true")}
              value={isAdmin}
              disabled
            ></input>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="sex"
              className="block text-sm font-medium text-gray-600"
            >
              Sex
            </label>
            <select
              type="text"
              id="sex"
              name="sex"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setSex(e.target.value)}
              value={sex}
            >
              <option value="N/A">N/A</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-600"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            />
          </div>
          <button
            type="button"
            onClick={handleEditUser}
            className="bg-blue-500 text-white py-2 px-3 active:bg-blue-500 hover:bg-blue-400 mx-auto rounded flex justify-center items-center"
          >
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
