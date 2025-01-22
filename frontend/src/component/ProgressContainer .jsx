import PropTypes from "prop-types";
import CircularProgress from "./CircularProgress ";

const ProgressContainer = ({ data }) => {
  const totalCount = data.totalSolved;
  const easyPercentage = ((data.easySolved / totalCount) * 100).toFixed(2);
  const mediumPercentage = ((data.mediumSolved / totalCount) * 100).toFixed(2);
  const hardPercentage = ((data.hardSolved / totalCount) * 100).toFixed(2);

  return (
    <div className="">
      <div className="flex space-x-2">
        <CircularProgress percentage={easyPercentage} color="#4caf50" />
        <CircularProgress percentage={mediumPercentage} color="#ffeb3b" />
        <CircularProgress percentage={hardPercentage} color="#f44336" />
      </div>
    </div>
  );
};

ProgressContainer.propTypes = {
  data: PropTypes.shape({
    totalSolved: PropTypes.number.isRequired,
    easySolved: PropTypes.number.isRequired,
    mediumSolved: PropTypes.number.isRequired,
    hardSolved: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProgressContainer;
