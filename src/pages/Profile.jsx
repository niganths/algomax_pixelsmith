import React from "react";
import { useDarkMode } from "../utils/DarkModeContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col items-center p-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
       <h1 className="text-3xl font-bold text-center pb-4">Profile</h1>
       <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Login</h2>
        <p className="text-sm mb-4">
          Log in to access personalized settings and your saved preferences.
        </p>
        <Link to={"/login"}
          className={`block w-full px-4 py-2 text-center rounded-lg ${
            isDarkMode ? "bg-teal-600 text-white" : "bg-teal-400 text-black"
          } hover:opacity-90`}
        >
          Log In
        </Link>
      </div>
   
      <div className="w-full max-w-md border-b pb-4 mb-6">
       
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg">Dark Mode</p>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
            } hover:opacity-90`}
          >
            {isDarkMode ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <p>Help & Feedback</p>
          <button
            className="text-teal-500 hover:underline"
            onClick={() => alert("Help & Feedback placeholder clicked")}
          >
            View
          </button>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <p>Help Us Translate</p>
          <button
            className="text-teal-500 hover:underline"
            onClick={() => alert("Help Us Translate placeholder clicked")}
          >
            View
          </button>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <p>Privacy Policy</p>
          <button
            className="text-teal-500 hover:underline"
            onClick={() => alert("Privacy Policy placeholder clicked")}
          >
            View
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p>Terms of Service</p>
          <button
            className="text-teal-500 hover:underline"
            onClick={() => alert("Terms of Service placeholder clicked")}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
