import React from "react";
import { useDarkMode } from "../utils/DarkModeContext";

const SignUp = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-gray-200 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">Sign Up</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full p-2 sm:p-3 border rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black border-gray-300"
              }`}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 sm:p-3 border rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black border-gray-300"
              }`}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-2 sm:p-3 border rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black border-gray-300"
              }`}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 sm:p-3 rounded-lg ${
              isDarkMode ? "bg-teal-600 text-white" : "bg-teal-500 text-black"
            } hover:opacity-90`}
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm sm:text-base">
            Already have an account?{" "}
            <a
              href="/login"
              className={`font-medium ${
                isDarkMode ? "text-teal-400" : "text-teal-600"
              } hover:underline`}
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
