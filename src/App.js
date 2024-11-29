import RootLayout from "./pages/RootLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import List_items from "./pages/List_items";
import Profile from "./pages/Profile";
import Sharedlist from "./pages/Sharedlist";
import { DarkModeProvider } from "./utils/DarkModeContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SuperCoin from "./pages/SuperCoin";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "list", element: <List_items /> },
      { path: "profile", element: <Profile /> },
      { path: "shared-list", element: <Sharedlist /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "supercoin", element: <SuperCoin /> },
    ],
  },
]);

function App() {
  return (
    <DarkModeProvider>
     
      <RouterProvider router={router} />
     
    </DarkModeProvider>
  );
}

export default App;
