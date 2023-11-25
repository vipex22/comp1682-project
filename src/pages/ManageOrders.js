import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { AdminIcon } from "../assets";

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

  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const ordersRef = collection(firestore, "allOrders");

      try {
        const ordersSnapshot = await getDocs(ordersRef);
        const ordersData = [];

        ordersSnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });

        setAllOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllOrders();
  }, []);



  const handleStatusChange = async (allOrderId, newStatus) => {
    try {
      const allOrdersDocRef = doc(firestore, "allOrders", allOrderId);
      const allOrdersDoc = await getDoc(allOrdersDocRef);
      if (allOrdersDoc.exists()) {
        const orderIdInAllOrders = allOrdersDoc.data().orderId;
        await updateDoc(allOrdersDocRef, { statusPayment: newStatus });
        setAllOrders((prevOrders) => {
          return prevOrders.map((order) =>
            order.id === allOrderId
              ? { ...order, statusPayment: newStatus }
              : order
          );
        });
        const userOrdersQuery = collection(firestore, `users/${user.uid}/orders`);
        const userOrdersSnapshot = await getDocs(userOrdersQuery);
        userOrdersSnapshot.forEach(async (userOrderDoc) => {
          const userOrderData = userOrderDoc.data();
          if (userOrderData.orderId === orderIdInAllOrders) {
            await updateDoc(userOrderDoc.ref, { statusPayment: newStatus });
          }
        });
      } else {
        console.error("allOrders document not found!");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  return (
    <div className="min-h-[650px]">
      {isAdmin && (
        <div className="max-w-screen-xl mx-auto py-10">
          <h2 className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)]">
            Manage Orders
          </h2>
          <div className="max-h-96 my-10 min-h-[650px] overflow-y-auto border-2 border-gray-400">
          {allOrders.length === 0 ? (
              <div className="max-w-screen-xl mx-auto py-20 items-center flex flex-col justify-center">
              <img className="w-28 mt-36" src={AdminIcon} alt="cartImg"></img>
              <p className="text-2xl font-semibold font-titleFont text-gray-300 mt-10">
                No order has been made!
              </p>
              
            </div>
            ) : (
            <table className="table-auto w-full font-titleFont border-2">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-gray-200">User Email</th>
                  <th className="border px-4 py-2 bg-gray-200">Date</th>
                  <th className="border px-4 py-2 bg-gray-200">
                    Product Title
                  </th>
                  <th className="border px-4 py-2 bg-gray-200">Quantity</th>
                  <th className="border px-4 py-2 bg-gray-200">Unit Price</th>
                  <th className="border px-4 py-2 bg-gray-200">Total Price</th>
                  <th className="border px-4 py-2 bg-gray-200">Address</th>
                  <th className="border px-4 py-2 bg-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2 w-40 text-center">
                      {order.userEmail}
                    </td>
                    <td className="border px-4 py-2 w-20 text-center">
                      {order.date.toDate().toLocaleString()}
                    </td>
                    <td className="border px-4 py-2 w-60 text-center">
                      {order.products.map((product) => (
                        <div key={product.productTitle}>
                          {product.productTitle}<br />
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2 w-20 text-center">
                      {order.products.map((product) => (
                        <div key={product.productTitle}>
                          {product.quantity}
                          <br />
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2 w-20 text-center">
                      {order.products.map((product) => (
                        <div key={product.productTitle}>
                          ${product.price}
                          <br />
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2 w-20 text-center">
                      {order.products.map((product) => (
                        <div key={product.productTitle}>
                          ${product.totalPrice}
                          <br />
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2 w-60 text-center">
                      {order.userAddress}
                    </td>
                    <td className="border px-4 py-2 w-60 text-center">
                      <select
                        className="border-2 border-gray-400"
                        name="status"
                        value={order.statusPayment}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Succeeded">Succeeded</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageOrders;
