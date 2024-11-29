import React, { useState } from "react";
import { useDarkMode } from "../utils/DarkModeContext";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const List_items = () => {
  const { isDarkMode } = useDarkMode();
  const [lists, setLists] = useState(() => {
    return JSON.parse(localStorage.getItem("shoppingLists")) || [];
  });
  const [currentList, setCurrentList] = useState("");
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [budget, setBudget] = useState("");
  const [voicePhase, setVoicePhase] = useState("category"); 
  const categories = {
    Dairy: ["Milk", "Cheese", "Butter", "Yogurt", "Cream", "Paneer", "Ghee", "Curd", "Ice Cream", "Kefir"],
    Vegetables: ["Carrot", "Potato", "Tomato", "Spinach", "Broccoli", "Onion", "Garlic", "Cabbage", "Cauliflower", "Cucumber"],
    Snacks: ["Chips", "Cookies", "Popcorn", "Candy", "Chocolate", "Crackers", "Pretzels", "Granola Bars", "Nuts", "Biscuits"],
  };

  const createList = () => {
    if (!currentList.trim()) return;
    const newList = { name: currentList, items: [], budget: budget || 0 };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
    setCurrentList("");
    setBudget("");
  };

  const addItemToList = (listIndex) => {
    if (!item.trim() || !itemPrice || isNaN(itemPrice)) return;
    const updatedLists = [...lists];
    updatedLists[listIndex].items.push({ name: item, price: parseFloat(itemPrice) });
    setLists(updatedLists);
    localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
    setItem("");
    setItemPrice("");
  };

  const deleteList = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
    localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
  };

  const removeItemFromList = (listIndex, itemIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].items.splice(itemIndex, 1);
    setLists(updatedLists);
    localStorage.setItem("shoppingLists", JSON.stringify(updatedLists));
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price || 0), 0);
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();

        if (voicePhase === "category") {
          // Check if the speech result matches any predefined category
          const detectedCategory = Object.keys(categories).find((cat) =>
            cat.toLowerCase() === speechResult
          );
          if (detectedCategory) {
            setCategory(detectedCategory);
            setVoicePhase("item"); // Move to the next phase
            console.log(`Category selected: ${detectedCategory}`);
          } else {
            console.error("Category not recognized. Please try again.");
          }
        } else if (voicePhase === "item") {
         
          const detectedItem =
            category &&
            categories[category].find(
              (itm) => itm.toLowerCase() === speechResult
            );
          if (detectedItem) {
            setItem(detectedItem);
            console.log(`Item selected: ${detectedItem}`);
          } else {
            console.error("Item not recognized. Please try again.");
          }
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended.");
      };
    }
  };

  const resetVoiceInput = () => {
    setVoicePhase("category");
    setCategory("");
    setItem("");
  };

  return (
    <div
      className={`flex flex-col items-center p-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex flex-col min-h-screen w-full max-w-4xl">
        <header
          className={`text-center p-6 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <h1 className="text-3xl font-bold tracking-wide mb-2">
            Shopping List App
          </h1>
          <p className="text-lg">Manage your shopping lists easily</p>
        </header>

        <div className="flex-1 flex flex-col p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 w-full max-w-lg mx-auto">
            <input
              type="text"
              value={currentList}
              onChange={(e) => setCurrentList(e.target.value)}
              placeholder="Enter list name"
              className="border p-3 rounded-lg w-full sm:w-80 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget"
              className="border p-3 rounded-lg w-full sm:w-80 mt-2 sm:mt-0 bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={createList}
              className="bg-indigo-600 text-white p-3 rounded-lg w-full sm:w-auto mt-2 sm:mt-0 shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Create List
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            {lists.map((list, index) => {
              const total = calculateTotal(list.items);
              const isOverBudget = total > list.budget;

              return (
                <div
                  key={index}
                  className={`border p-6 rounded-lg shadow-lg ${
                    isDarkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <h2 className="text-2xl font-semibold pb-2">{list.name}</h2>
                  <p
                    className={`text-sm pb-4 ${
                      isOverBudget ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    Budget: ₹{list.budget} | Total: ₹{total.toFixed(2)}
                  </p>
                  <ul className="list-disc pl-6 space-y-2 pb-4">
                    {list.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        {item.name} - ₹{item.price.toFixed(2)}
                        <button
                          onClick={() => removeItemFromList(index, idx)}
                          className="text-red-500 hover:text-red-700 transition duration-300"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="border p-3 rounded-lg w-full sm:w-auto bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <select
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                      className="border p-3 rounded-lg w-full sm:w-auto bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-indigo-400"
                      disabled={!category}
                    >
                      <option value="">Select Item</option>
                      {category &&
                        categories[category].map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                    <input
                      type="number"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      placeholder="Item price"
                      className="border p-3 rounded-lg w-full sm:w-auto bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      onClick={() => addItemToList(index)}
                      className="bg-green-600 text-white p-3 rounded-lg w-full sm:w-auto shadow-lg hover:bg-green-700 transition duration-300"
                    >
                      Add Item
                    </button>
                  </div>
                  <button
                    onClick={() => deleteList(index)}
                    className="bg-red-500 text-white p-3 mt-4 rounded-lg w-full sm:w-auto shadow-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete List
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pb-8">
          <button
            onClick={startListening}
            className="bg-yellow-500 text-white p-3 rounded-lg w-full sm:w-auto shadow-lg hover:bg-yellow-600 transition duration-300"
          >
            Start Voice Input ({voicePhase === "category" ? "Select Category" : "Select Item"})
          </button>
          <button
            onClick={resetVoiceInput}
            className="bg-red-500 text-white p-3 rounded-lg w-full sm:w-auto mt-2 shadow-lg hover:bg-red-600 transition duration-300"
          >
            Reset Voice Input
          </button>
        </div>
      </div>
    </div>
  );
};

export default List_items;
