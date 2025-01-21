import PropTypes from 'prop-types';

const SubmitButton = ({ currentState }) => (
  <button className="bg-[#ff5757] rounded-[24px] text-white font-semibold px-8 py-2 mt-5 w-[40%]">
    {currentState === 'Login' ? 'Login' : 'Sign Up'}
  </button>
);

SubmitButton.propTypes = {
  currentState: PropTypes.string.isRequired,
};

export default SubmitButton;
