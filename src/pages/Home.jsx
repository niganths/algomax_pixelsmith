import React, { useState, useEffect } from "react";
import Homeimg from "../assets/images/home_image.jpg";
import { useDarkMode } from "../utils/DarkModeContext";
import { Link } from "react-router-dom";

const Home = () => {
  const {isDarkMode} = useDarkMode();
  
  const [lists, setLists] = useState([]);
  const [shareableLink, setShareableLink] = useState("");

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("shoppingLists")) || [];
    setLists(savedLists);
  }, []);

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + (item.price || 0), 0);

  const deleteList = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
    localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
  };

  const toggleItemCompletion = (listIndex, itemIndex) => {
    const updatedLists = [...lists];
    const item = updatedLists[listIndex].items[itemIndex];
    item.completed = !item.completed; 
    setLists(updatedLists);
    localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
  };

  const generateShareableLink = (listIndex) => {
    const list = lists[listIndex];
    const baseUrl = window.location.origin; 
    const shareableData = encodeURIComponent(JSON.stringify(list));
    const link = `${baseUrl}/shared-list?data=${shareableData}`;
    setShareableLink(link);
  };

  return (
    <div
    className={`flex flex-col items-center p-6 min-h-screen ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}
  >
   
    <div className={`flex flex-col min-h-screen ${
      isDarkMode ? "bg-gray-900 text-white " : "bg-gray-50 text-black "
    }`}>
      {lists.length === 0 ? (
        
        <section className="pt-40 items-center flex-shrink-0 p-4">
          <div className="flex flex-col items-center justify-center">
            <img src={Homeimg} alt="home_image" className="w-85 h-40 mb-4" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-400">
                Let’s plan your shopping!
              </h1>
              <h2 className="text-lg font-bold text-gray-600 mt-2">
                Tap the plus button to create your first list
              </h2>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              to={"/list"}
            >
              + NEW LIST
            </Link>
          </div>
        </section>
      ) : (
        
        <div className={ `p-6 space-y-6`}>
          {lists.map((list, index) => {
            const total = calculateTotal(list.items);
            const isOverBudget = total > list.budget;

            return (
              <div
                key={index}
                className={` border p-6 rounded-lg shadow-lg space-y-4${
                  isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
                }`}
              >
                <h2 className="text-2xl font-semibold pb-4">
                  {list.name}
                </h2>
                <p
                  className={`text-sm pb-4 ${
                    isOverBudget ? "text-red-500" : "text-green-500"
                  }`}
                >
                  Budget: ₹{list.budget} | Total: ₹{total.toFixed(2)}
                </p>
                <ul className="list-disc pl-6 space-y-2 pb-4">
                  {list.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-lg  flex justify-between items-center"
                    >
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={item.completed || false}
                          onChange={() => toggleItemCompletion(index, idx)}
                          className="w-5 h-5"
                        />
                        <span
                          className={`${
                            item.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {item.name} - ₹
                          {item.price ? item.price.toFixed(2) : "0.00"}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>

                <div className="text-center space-y-4">
                 
                  <button
                    onClick={() => generateShareableLink(index)}
                    className="bg-blue-600 text-white p-3 rounded-lg w-full sm:w-auto shadow-lg hover:bg-blue-700 transition duration-300"
                  >
                    Generate Shareable Link
                  </button>

                  {shareableLink && (
                    <div className="mt-4 bg-gray-100 p-2 rounded-md text-center">
                      <p className="text-gray-700 break-all">
                        <strong>Share this link:</strong>
                      </p>
                      <input
                        type="text"
                        value={shareableLink}
                        readOnly
                        className="w-full p-2 mt-2 border rounded-lg bg-gray-200"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(shareableLink)}
                        className="bg-green-500 text-white p-2 mt-2 rounded-lg w-full sm:w-auto hover:bg-green-600 transition duration-300"
                      >
                        Copy Link
                      </button>
                    </div>
                  )}

                 
                  <button
                    onClick={() => deleteList(index)}
                    className="bg-red-600 text-white p-3 rounded-lg w-full sm:w-auto shadow-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete List
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
   </div> 
  );
};

export default Home;
