import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { FcMoneyTransfer } from "react-icons/fc";
import { LuShoppingBag } from "react-icons/lu";
import TransactionChart from "../components/TransactionChart";
import CustomerGender from "../components/CustomerGender";
import { onSnapshot } from "firebase/firestore";
const DashBoard = () => {
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

  //products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      const productsRef = collection(firestore, "products");

      const unsubscribe = onSnapshot(productsRef, (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      });

      return unsubscribe;
    };

    fetchProducts();
  }, []);

  //users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      const userRef = collection(firestore, "users");

      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(productsData);
      });

      return unsubscribe;
    };

    fetchUsers();
  }, []);

  //orders
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
  //TotalSales
  const calculateTotalSales = () => {
    let totalSales = 0;

    allOrders.forEach((order) => {
      order.products.forEach((product) => {
        totalSales += product.totalPrice;
      });
    });

    return totalSales;
  };
  return (
    <div className="min-h-[650px]">
      {isAdmin && (
        <div className="max-w-screen-xl mx-auto py-10">
          <h2 className="max-w-screen-xl mx-auto text-3xl font-bold font-titleFont drop-shadow-[3px_3px_3px_rgba(255,0,0)] pl-2">
            DashBoard
          </h2>
          <div className="max-h-96 my-10 min-h-[650px]">
            <div className="flex flex-wrap gap-4 w-full ">
              <Box>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                  <FcMoneyTransfer className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                  <span className="text-sm text-gray-500 font-titleFont">
                    Total Sales
                  </span>
                  <div className="flex items-center">
                    <strong className="text-xl text-gray-700 font-titleFont">
                      ${calculateTotalSales().toFixed(2)}
                    </strong>
                  </div>
                </div>
              </Box>
              <Box>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-500">
                  <FcMoneyTransfer className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                  <span className="text-sm text-gray-500 font-titleFont">
                    Products
                  </span>
                  <div className="flex items-center">
                    <strong className="text-xl text-gray-700 font-titleFont">
                      {products.length}
                    </strong>
                  </div>
                </div>
              </Box>
              <Box>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
                  <LuShoppingBag className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                  <span className="text-sm text-gray-500 font-titleFont">
                    Total Customer
                  </span>
                  <div className="flex items-center">
                    <strong className="text-xl text-gray-700 font-titleFont">
                      {users.length}
                    </strong>
                  </div>
                </div>
              </Box>
              <Box>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-300">
                  <LuShoppingBag className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                  <span className="text-sm text-gray-500 font-titleFont">
                    Total Orders
                  </span>
                  <div className="flex items-center">
                    <strong className="text-xl text-gray-700 font-titleFont">
                      {allOrders.length}
                    </strong>
                  </div>
                </div>
              </Box>
            </div>
            <div className="flex flex-row gap-4 w-full pt-10">
              <TransactionChart />
              <CustomerGender />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashBoard;

function Box({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center justify-center">
      {children}
    </div>
  );
}
