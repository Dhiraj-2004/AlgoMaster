import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex justify-center items-center text-2xl transition-transform duration-500 transform 
      bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 
      rounded-full h-10 w-10 shadow-md dark:shadow-lg border border-gray-400 dark:border-none
      focus:outline-none active:scale-90"    
    >
      {theme === "light" ? <FaRegMoon className="text-center font-bold transition-colors duration-500 " /> : <GoSun className="text-center text-yellow-400 font-bold transition-colors duration-500"/>}
    </button>
  );
};

export default ThemeToggle;
