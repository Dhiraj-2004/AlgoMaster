import PropTypes from "prop-types";

const CircularProgress = ({ percentage, color }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-42 h-42">
      <svg className="rotate-[-90deg]" width="120" height="120">
        <circle
          r={radius}
          cx="60"
          cy="60"
          className="fill-none stroke-gray-600"
          strokeWidth="8"
        ></circle>

        <circle
          r={radius}
          cx="60"
          cy="60"
          className="fill-none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        ></circle>
      </svg>

      
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-600">
        {percentage}%
      </span>
    </div>
  );
};

CircularProgress.propTypes = {
  color: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default CircularProgress;
