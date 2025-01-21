import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Dropdown = ({ options, value, onChange, label }) => {
  const [selet, setSelet] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [themes, setThemes] = useState(theme);

  useEffect(() => {
    setThemes(theme);
  }, [theme]);

  const handleSelectChange = (event) => {
    setSelet(true);
    onChange(event);
  };

  const inputStyles = (themes === 'dark')
    ? 'border-gray-600 bg-gray-800'
    : 'border-gray-300 bg-white text-black';

  const labelStyles = themes === 'dark'
    ? ' text-white'
    : 'text-gray-900';
  return (
    <div className='w-full space-y-2'>
      <label className={`text-sm font-medium ${labelStyles} text-sm font-medium`}>{label}</label>
      <select
        id="dropdown"
        value={value}
        onChange={handleSelectChange}
        className={`w-full px-4 py-2 border ${inputStyles} rounded-md focus:ring-2 focus:ring-[#ff5757] focus:outline-none ${selet ? 'text-white' : 'text-gray-400'} `}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default Dropdown;
