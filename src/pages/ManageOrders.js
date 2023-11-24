import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ManageOrders = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
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
        console.log("isAdmin:", isAdminValue);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    const delay = 1000;

    const timeoutId = setTimeout(() => {
      if (!isAdmin) {
        navigate("/404");
      }
    }, delay);

    return () => clearTimeout(timeoutId);

  }, [isAdmin, navigate]);
  return (
    <div className="min-h-[650px]">
      {isAdmin && <p>this is manage orders</p>}
    </div>
  );
};
export default ManageOrders;
