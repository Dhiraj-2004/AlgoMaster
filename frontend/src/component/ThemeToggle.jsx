import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={setTheme}
      className="mr-5 mt-1 rounded-full flex items-center justify-center
        text-3xl 
        sm:h-16 sm:w-16
        md:h-16 md:w-16
        lg:h-16 lg:w-16 
        xl:h-16 xl:w-16
        transition-all duration-1000 ease-in-out"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
