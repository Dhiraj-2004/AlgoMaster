import PropTypes from 'prop-types';

const SubmitButton = ({ currentState }) => {
  const buttonText = currentState === 'Login' ? 'Login' : 'Sign Up';

  return (
    <div className="flex items-center justify-center">
      <button className="custom-button w-[90%] h-14">
        <span className="font-medium text-xl">{buttonText}</span>
      </button>
    </div>
  );
};

SubmitButton.propTypes = {
  currentState: PropTypes.oneOf(["Login", "Sign Up"]).isRequired,
};

export default SubmitButton;
