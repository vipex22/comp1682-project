import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { AdminIcon } from "../assets";

const ManageUsers = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [usersData, setUsersData] = useState([]); // State to store users data
  const navigate = useNavigate();

  const getUserDetail = async (uid, field) => {
    try {
      const userDocRef = doc(firestore, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data()[field];
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

  useEffect(() => {
    const delay = 1000;

    const timeoutId = setTimeout(() => {
      if (!isAdmin) {
        navigate("/404");
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);

        // Extract user data from each document
        const usersData = usersSnapshot.docs.map((userDoc) => ({
          id: userDoc.id,
          ...userDoc.data(),
        }));

        setUsersData(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-[650px]">
      {isAdmin && (
        <div className="max-w-screen-xl mx-auto py-10">
          <h2 className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] pl-2">
            Manage Users
          </h2>
          <div className="max-h-96 my-10 min-h-[650px] overflow-y-auto border-2 border-gray-400">
            <table className="table-auto w-full font-titleFont">
              <thead className="sticky top-0">
                <tr>
                  <th className="border px-4 py-2 bg-gray-200">isAdmin</th>
                  <th className="border px-4 py-2 bg-gray-200">Email</th>
                  <th className="border px-4 py-2 bg-gray-200">Phone Number</th>
                  <th className="border px-4 py-2 bg-gray-200">Address</th>
                  <th className="border px-4 py-2 bg-gray-200">Sex</th>
                  <th className="border px-4 py-2 bg-gray-200">DoB</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2 w-60 text-center">
                      {user.isAdmin ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2 w-60 text-center">
                      {user.email || "N/A"}
                    </td>
                    <td className="border px-4 py-2 w-40 text-center">
                      {user.phoneNumber || "N/A"}
                    </td>
                    <td className="border px-4 py-2 w-40 text-center">
                      {user.address || "N/A"}
                    </td>
                    <td className="border px-4 py-2 w-20 text-center">
                      {user.sex || "N/A"}
                    </td>
                    <td className="border px-4 py-2 w-40 text-center">
                      {user.dob || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
