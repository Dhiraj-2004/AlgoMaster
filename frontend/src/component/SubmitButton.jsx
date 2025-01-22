import PropTypes from 'prop-types';

const SubmitButton = ({ currentState }) => (
  <button className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 font-medium text-lg px-4 py-2 text-center dark:hover:bg-red-700 dark:focus:ring-red-800 w-32 h-12 rounded-2xl">
    {currentState === 'Login' ? 'Login' : 'Sign Up'}
  </button>
);

SubmitButton.propTypes = {
  currentState: PropTypes.string.isRequired,
};

export default SubmitButton;
