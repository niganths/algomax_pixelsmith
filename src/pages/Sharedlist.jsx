import React from "react";
import { useLocation } from "react-router-dom";

const Sharedlist = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sharedList = JSON.parse(decodeURIComponent(query.get("data")));

  if (!sharedList) {
    return <p className="text-center text-gray-500 text-lg">No list data found!</p>;
  }

  const calculateTotalPrice = () =>
    sharedList.items.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-lg text-gray-500 mb-2">
          The list is shared by your friend
        </h2>
        <h1 className="text-3xl font-bold text-blue-600">{sharedList.name}</h1>
      </div>
      <ul className="list-disc pl-6">
        {sharedList.items.map((item, index) => (
          <li key={index} className="text-lg flex justify-between items-center mb-2">
            <span className="font-medium">{item.name}</span>
            <span className="text-gray-600">
            ₹{item.price ? item.price.toFixed(2) : "0.00"}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-medium">
          <strong>Total Items:</strong> {sharedList.items.length}
        </p>
        <p className="text-lg font-medium">
          <strong>Total Price:</strong> ₹{calculateTotalPrice().toFixed(2)}
        </p>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Happy Shopping! ✨</p>
      </div>
    </div>
  );
};

export default Sharedlist;
