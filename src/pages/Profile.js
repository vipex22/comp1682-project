import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    sex: "",
    dob: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setFormData({
          phoneNumber: await getUserDetail(user.uid, "phoneNumber"),
          address: await getUserDetail(user.uid, "address"),
          sex: await getUserDetail(user.uid, "sex"),
          dob: await getUserDetail(user.uid, "dob"),
        });
      }
    });

    return () => unsubscribe();
  }, []);

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

  const updateUserDetail = async (uid, field, value) => {
    try {
      const docRef = doc(firestore, "users", uid);
      await setDoc(docRef, { [field]: value }, { merge: true });
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserDetail(user.uid, "phoneNumber", formData.phoneNumber);
      await updateUserDetail(user.uid, "address", formData.address);
      await updateUserDetail(user.uid, "sex", formData.sex);
      await updateUserDetail(user.uid, "dob", formData.dob);

      setEditMode(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["phoneNumber", "address", "sex", "dob"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("Log out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="max-w-screen-xl mx-auto py-10">
          <h2 className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">
            Profile Details
          </h2>

          <div className="grid grid-cols-2">
            <div className="flex justify-center">
              <div className="items-center">
                <img
                  className="w-40 h-40 mt-10 rounded-full border-2 border-black"
                  src={user.photoURL}
                  alt="userLogo"
                />
                <p className="text-lg font-bold font-titleFont pt-3">
                  {user.displayName}
                </p>
                <button
                  className="bg-black text-white w-full mt-5 py-2 px-3 active:bg-black hover:bg-gray-800 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="pb-2 max-w-screen-xl mx-auto pt-10 text-xl font-titleFont">
                <strong>Account Name: </strong>
                {user.displayName}
              </div>
              <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
                <strong>Email: </strong>
                {user.email}
              </div>
              <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
                <strong>Phone Number: </strong>
                {editMode ? (
                  <input
                    className="border-2 border-gray-400"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  formData.phoneNumber || "N/A"
                )}
              </div>
              <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
                <strong>Address: </strong>
                {editMode ? (
                  <input
                    className="border-2 border-gray-400"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  formData.address || "N/A"
                )}
              </div>
              <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
                <strong>Sex: </strong>
                {editMode ? (
                  <input
                    className="border-2 border-gray-400"
                    type="text"
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                  />
                ) : (
                  formData.sex || "N/A"
                )}
              </div>
              <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
                <strong>Date of Birth: </strong>
                {editMode ? (
                  <input
                    className="border-2 border-gray-400"
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                ) : (
                  formData.dob || "N/A"
                )}
              </div>

              {editMode ? (
                <button
                  className="bg-red-500 text-white py-2 px-3 active:bg-red-500 hover:bg-red-400 rounded"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-red-500 text-white py-2 px-3 active:bg-red-500 hover:bg-red-400 rounded"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <h2 className="max-w-screen-xl mx-auto text-3xl py-10 font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">
            Orders
          </h2>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-20 items-center flex flex-col justify-center">
          <p className="text-2xl font-semibold font-titleFont text-gray-300 mt-10">
            LOADING...
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
