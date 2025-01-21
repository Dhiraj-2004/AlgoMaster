import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";
import Sidebar from "../component/Sidebar";
import ThemeToggle from "../component/ThemeToggle";
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('token');
    setIsLoggedIn(!!user);
  }, [navigate]);

  return (
    <nav className="border-gray-200 bg-[#15171c] fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/">
          <img src={assets.logo} alt="Logo" className="w-48 xl:w-48 lg:w-44 md:w-40 sm:w-40 object-contain"/>
        </NavLink>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isLoggedIn ? 
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-24 rounded-3xl"
              onClick={()=>{navigate("/login")} }
            >
              Login
            </button>
            :
            <div className='flex'>
                <ThemeToggle />
                <Sidebar />
            </div>
        }
        </div>
        {
            isLoggedIn ?
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-xl">
                    <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                        isActive
                            ? 'block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                            : 'block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                        }
                        aria-current="page"
                    >
                        Home
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                        to="/leetcode"
                        className={({ isActive }) =>
                        isActive
                            ? 'block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                            : 'block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                        }
                    >
                        LeetCode
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                        to="/codechef"
                        className={({ isActive }) =>
                        isActive
                            ? 'block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                            : 'block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                        }
                    >
                        CodeChef
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                        to="/codeforces"
                        className={({ isActive }) =>
                        isActive
                            ? 'block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                            : 'block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                        }
                    >
                        CodeForces
                    </NavLink>
                    </li>
                </ul>
            </div>
            :
            <div></div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
