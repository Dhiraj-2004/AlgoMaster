import PropTypes from 'prop-types';

const SubmitButton = ({ currentState }) => (
  <button className="gradient-button gradient-button--large">
    <span className='gradient-button-text'>{currentState === 'Login' ? 'Login' : 'Sign Up'}</span>
  </button>
);

SubmitButton.propTypes = {
  currentState: PropTypes.string.isRequired,
};

export default SubmitButton;
