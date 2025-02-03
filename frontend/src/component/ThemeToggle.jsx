import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="text-3xl transition-transform duration-1000 focus:outline-none bg-zinc-500 dark:bg-zinc-600 rounded-full h-10 w-10"
    >
      {theme === "light" ? <FaRegMoon className="ml-1 font-bold transition-colors duration-500 " /> : <GoSun className="ml-1 text-yellow-400 font-bold transition-colors duration-500"/>}
    </button>
  );
};

export default ThemeToggle;
