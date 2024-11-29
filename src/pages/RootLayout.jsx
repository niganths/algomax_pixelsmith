import { Outlet } from "react-router-dom";
import Navbar from "../components/Header"
 import Footer from "../components/Footer";


function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="max-h-fit">
  <main className="max-h-fit overflow-y-auto pb-20">
    <Outlet />
  </main>
</div>
      <Footer/>
    </>
  );
}
export default RootLayout;