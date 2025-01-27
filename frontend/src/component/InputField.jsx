import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const InputField = ({ type, value, onChange, placeholder, label }) => {
  const { theme } = useContext(ThemeContext);
  const [themes, setThemes] = useState(theme);
  useEffect(() => {
    setThemes(theme);
  }, [theme]);

  const inputStyles = themes === 'dark'
    ? 'border-gray-600 bg-gray-800 text-white'
    : 'border-gray-300 bg-white text-black';

  const labelStyles = themes === 'dark'
    ? 'text-white'
    : 'text-gray-900';
  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && <label className={`text-sm font-medium ${labelStyles} text-sm font-medium`}>{label}</label>}
      <input
        className={`w-full h-14 p-4 border ${inputStyles} rounded-xl focus:ring-2 focus:ring-[#ff5757] focus:outline-none`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default InputField;
