import PropTypes from "prop-types";
import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Dropdown = ({ name, options, value, onChange, label, newStyle }) => {
  const [select, setSelect] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [themes, setThemes] = useState(theme);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    setThemes(theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (newValue) => {
    setSelect(true);
    setSelectedValue(newValue);
    onChange({ target: { name, value: newValue } });
    setIsOpen(false);
  };

  const selectedLabel = options.find(
    (option) => (typeof option === "object" ? option.value === selectedValue : option === selectedValue)
  )?.label || selectedValue;

  const inputStyles =
    themes === "dark"
      ? "border-gray-600 bg-zinc-800"
      : "border-gray-300 bg-white text-black";
  const labelStyles = themes === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className="flex flex-col space-y-2 w-full relative" ref={dropdownRef}>
      {label && <label className={`text-sm font-medium ${labelStyles}`}>{label}</label>}
      <div
        ref={selectRef}
        className={`w-full h-14 p-4 border ${inputStyles} rounded-xl flex items-center justify-between cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap ${newStyle || ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`truncate ${select ? "" : "text-zinc-400"}`}>
          {selectedLabel}
        </span>
        <svg
          className="fill-current h-6 w-6 text-zinc-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707 0.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      {isOpen && (
        <ul className={`absolute z-10 mt-1 max-w-full w-auto rounded-md shadow-lg ${inputStyles}`}>
          {options.map((option, index) => {
            const isObject = typeof option === "object";
            const optionValue = isObject ? option.value : option;
            const optionLabel = isObject ? option.label : option;

            return (
              <li
                key={index}
                className={`flex items-center justify-between p-2 cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700 ${optionValue === selectedValue ? "bg-zinc-700 dark:bg-gray-700 text-blue-500" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectChange(optionValue);
                }}
              >
                <span>{optionLabel}</span>
                {optionValue === selectedValue && (
                  <svg
                    className="fill-current h-4 w-4 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill="currentColor" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  newStyle: PropTypes.string,
};

export default Dropdown;
