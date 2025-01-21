import PropTypes from 'prop-types';

const Dropdown = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-gray-800 text-white p-2 rounded-md w-full"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, 
};

export default Dropdown;
