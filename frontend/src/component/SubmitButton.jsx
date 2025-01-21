import PropTypes from 'prop-types';

const SubmitButton = ({ currentState }) => (
  <button className="bg-[#ff5757] rounded-[24px] text-black font-light px-8 py-2 mt-5">
    {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
  </button>
);

SubmitButton.propTypes = {
  currentState: PropTypes.string.isRequired,
};

export default SubmitButton;
