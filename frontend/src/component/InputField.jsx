import PropTypes from 'prop-types';

const InputField = ({ type, value, onChange, placeholder, theme }) => {
  const inputStyles = theme === 'dark' 
    ? 'w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-[#ff5757]' 
    : 'w-full px-3 py-2 border border-gray-800 bg-white text-black focus:ring-2 focus:ring-[#ff5757]';

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={inputStyles}
      placeholder={placeholder}
      required
    />
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

export default InputField;
