// Profile.js
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Profile = () => {
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

    // Only allow changes to specific fields
    if (["phoneNumber", "address", "sex", "dob"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      {user ? (
        <div className="max-w-screen-xl mx-auto py-10">
          <h2 className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">Profile Details</h2>
          <div className="pb-2 max-w-screen-xl mx-auto text-xl font-titleFont">
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
            <button className="bg-red-500 text-white w-20 py-3 mt-5 active:bg-red-500 hover:bg-red-400" onClick={handleSaveClick}>Save</button>
          ) : (
            <button className="bg-red-500 text-white w-20 py-3 mt-5 active:bg-red-500 hover:bg-red-400" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
