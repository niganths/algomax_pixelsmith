import Logo from "../assets/images/best_market.png";
function Header() {
  return (
    <nav className="bg-opacity-75  dark:bg-zinc-900  justify-around">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-8" alt="Cug Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Smart-Groceries
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Header;
