import { Link } from "react-router-dom";
import { ClipboardDocumentListIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline"; // Correct v2 imports

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white  shadow dark:bg-zinc-900 w-full p-4 z-10">
    <div className="max-w-screen-xl mx-auto p-4 flex justify-around items-center">
      <Link
        to="list"
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-teal-400"
      >
        <ClipboardDocumentListIcon className="h-6 w-6 mb-1" />
        <span className="text-sm font-medium">MyList</span>
      </Link>
      <Link
        to="/supercoin"
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-teal-400"
      >
        <CurrencyDollarIcon className="h-6 w-6 mb-1" />
        <span className="text-sm font-medium">Supercoin</span>
      </Link>
      <Link
        to="/profile"
        className="flex flex-col items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-teal-400"
      >
        <UserCircleIcon className="h-6 w-6 mb-1" />
        <span className="text-sm font-medium">Profile</span>
      </Link>
    </div>
  </footer>
  
  );
}

export default Footer;
