import React, { useEffect, useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../utils/DarkModeContext";

const SuperCoin = () => {
  const { isDarkMode } = useDarkMode();
  const [superCoins, setSuperCoins] = useState(0);
  const [history, setHistory] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("shoppingLists")) || [];
    const totalSpending = savedLists.reduce(
      (total, list) =>
        total +
        list.items.reduce(
          (itemTotal, item) => itemTotal + (item.price || 0),
          0
        ),
      0
    );

    setMonthlySpending(totalSpending);

    const coins = Math.floor(totalSpending / 100);
    setSuperCoins(coins);

    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const newHistory = [...history, { month: currentMonth, coins }];
    setHistory(newHistory);

    localStorage.setItem("superCoinHistory", JSON.stringify(newHistory));

    // Check for badges
    const snacksList = [
      "chips",
      "cookies",
      "popcorn",
      "candy",
      "chocolate",
      "crackers",
      "pretzels",
      "granola bars",
      "nuts",
      "biscuits",
    ];

    const healthyShopperBadge = savedLists.some(
      (list) =>
        !list.items.some((item) =>
          snacksList.includes(item.name.toLowerCase())
        )
    )
      ? "Healthy Shopper"
      : null;

    if (healthyShopperBadge) {
      setEarnedBadges((prevBadges) =>
        prevBadges.includes(healthyShopperBadge)
          ? prevBadges
          : [...prevBadges, healthyShopperBadge]
      );
    }
  }, []);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("superCoinHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div
      className={`relative min-h-screen p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Super Coins Indicator */}
      <div className="absolute top-6 right-6 flex items-center space-x-2 text-white bg-blue-700 p-2 rounded-lg shadow-lg">
        <span className="text-lg font-bold">{superCoins}</span>
        <CurrencyDollarIcon className="h-6 w-6 text-yellow-400" />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Super Coins</h1>

      {/* Monthly Spending and Super Coins */}
      <div
        className={`border border-gray-500 text-lg mb-6 p-4 rounded-lg shadow-lg mx-auto w-full max-w-md ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <p className="text-xl">
          <strong>Monthly Spending :</strong> ₹ {monthlySpending.toFixed(2)}
        </p>
        <p className="text-lg mt-2">
          <strong>Super Coins Earned:</strong>{" "}
          <span className="flex items-center justify-center space-x-2">
            <span>{superCoins}</span>
            <CurrencyDollarIcon className="h-5 w-5 text-yellow-400" />
          </span>
        </p>
      </div>

      {/* Coin History */}
      <div
        className={`border border-gray-500 mt-6 p-6 rounded-lg shadow-lg mx-auto w-full max-w-md ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Coin History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No history available.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-2">
            {history.map((entry, index) => (
              <li
                key={index}
                className="text-lg flex justify-between items-center"
              >
                <span className="font-semibold">{entry.month}</span>
                <span className="flex items-center space-x-2">
                  <span>{entry.coins}</span>
                  <CurrencyDollarIcon className="h-5 w-5 text-yellow-400" />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div
          className={`border border-gray-500 mt-6 p-6 rounded-lg shadow-lg mx-auto w-full max-w-md ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Earned Badges</h2>
          <ul className="list-disc pl-6 space-y-2">
            {earnedBadges.map((badge, index) => (
              <li key={index} className="text-lg flex items-center space-x-2">
                <span>🏅</span>
                <span className="font-semibold">{badge}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuperCoin;
