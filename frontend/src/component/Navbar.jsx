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
    <nav className="navbar bg-[#000004] fixed top-0 left-0 w-full z-50 border-b border-[#1c1c1e]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/">
          <img src={assets.Logo} alt="Logo" className="w-48 xl:w-48 lg:w-44 md:w-40 sm:w-40 object-contain" />
        </NavLink>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isLoggedIn ?    
            <button
              type="button"
              className="text-white bg-[#4387f2] hover:bg-[#ed4236] focus:ring-4 font-medium text-lg px-4 py-2 text-center dark:hover:bg-[#ed4236] dark:focus:ring-red-800 w-28 h-12 rounded-2xl"
              onClick={() => { navigate("/login") }}
            >
              Login
            </button>
            :
            <div className='flex items-center space-x-4'>
              <ThemeToggle />
              <Sidebar />
            </div>
          }
        </div>
        {
          isLoggedIn ?
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 text-xl text-white">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? 'block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                        : 'block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
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
                        ? 'block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                        : 'block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
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
                        ? 'block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                        : 'block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
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
                        ? 'block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500'
                        : 'block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500'
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
