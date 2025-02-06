import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import ThemeToggle from "../component/ThemeToggle";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    setIsLoggedIn(!!user);
  }, [navigate]);

  return (
    <nav className="manrope-regular fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300 
      bg-white text-black dark:bg-black dark:text-white 
      border-b border-gray-300 dark:border-none">
      
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        
        <NavLink to="/home" className="hover:opacity-85 transition-opacity duration-200">
          <div className="flex justify-center items-center px-2 md:px-3">
            <h1 className="text-3xl md:text-[28px] lg:text-3xl xl:text-3xl lexend-bold whitespace-nowrap">
              <span className="text-orange-500">{`{`}</span>
              <span className="logo1">Algo</span>
              <span className="logo2">Masters</span>
              <span className="text-indigo-500">{`}`}</span>
            </h1>
          </div>
        </NavLink>

        <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse">
          {!isLoggedIn ? (
            <button
              type="button"
              className="text-white bg-orange-500 hover:bg-red-600 dark:bg-orange-700 dark:hover:bg-orange-600 
              focus:ring-4 dark:focus:ring-orange-700 font-medium text-sm md:text-lg 
              px-3 md:px-4 py-1.5 md:py-2 text-center w-20 md:w-28 h-10 md:h-12 
              rounded-2xl transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="flex items-center">
              <ThemeToggle/>
              <Sidebar />
            </div>
          )}
        </div>

        {isLoggedIn && (
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 
              rtl:space-x-reverse md:flex-row md:mt-0 text-lg md:text-xl">
              
              {['Home', 'LeetCode', 'CodeChef', 'CodeForces'].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 md:p-0 border-b-2 border-orange-500 text-black dark:text-orange-400 "
                        : "block py-2 px-3 md:p-0 text-gray-700 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
                    }
                    aria-current={item === "Home" ? "page" : undefined}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
