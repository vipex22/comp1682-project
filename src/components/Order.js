import React from "react";

const Order = ({ order }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="py-2">
      <h3 className="text-red-500 pl-2 font-semibold">
        {formatDate(order.date)}
      </h3>
      <table className="table-auto w-full font-titleFont border-2">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-200">Product Title</th>
            <th className="border px-4 py-2 bg-gray-200">Quantity</th>
            <th className="border px-4 py-2 bg-gray-200">Unit Price</th>
            <th className="border px-4 py-2 bg-gray-200">Total Price</th>
            <th className="border px-4 py-2 bg-gray-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 w-80 text-center">
                {product.productTitle}
              </td>
              <td className="border px-4 py-2 w-30 text-center">
                {product.quantity}
              </td>
              <td className="border px-4 py-2 w-80 text-center">
                ${product.price}
              </td>
              <td className="border px-4 py-2 w-80 text-center">
                ${product.totalPrice}
              </td>
              <td className="border px-4 py-2 w-80 text-center">
                {order.statusPayment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
