import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export default function TransactionChart() {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const ordersRef = collection(firestore, "allOrders");
      try {
        const ordersSnapshot = await getDocs(ordersRef);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  const calculateTotalPriceByDate = () => {
    const totalPriceByDate = {};

    allOrders.forEach((order) => {
      const orderDate = new Date(order.date.toDate());
      const formattedDate = orderDate.toLocaleDateString();

      let totalPrice = 0;
      order.products.forEach((product) => {
        totalPrice += parseFloat(product.totalPrice);
      });

      if (totalPriceByDate[formattedDate]) {
        totalPriceByDate[formattedDate] += totalPrice;
      } else {
        totalPriceByDate[formattedDate] = totalPrice;
      }
    });

    const sortedDates = Object.keys(totalPriceByDate)
    .map((date) => ({ date: new Date(date), Income: totalPriceByDate[date] }))
    .sort((a, b) => a.date - b.date)
    .map((item) => ({ date: item.date.toLocaleDateString(), Income: item.Income }));

  return sortedDates;
  };

  const data = calculateTotalPriceByDate();

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
