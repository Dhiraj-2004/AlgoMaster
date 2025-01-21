import PropTypes from "prop-types";

const ArcDesign = ({ data }) => {
  const easyPercentage = Math.round((data.easySolved / data.totalEasy) * 100);
  const mediumPercentage = Math.round((data.mediumSolved / data.totalMedium) * 100);
  const hardPercentage = Math.round((data.hardSolved / data.totalHard) * 100);

  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      <h1 className="text-2xl font-bold text-white">User Statistics</h1>
      <div className="flex flex-row justify-around w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-white">Easy</h2>
          <p className="text-white">{`Solved: ${data.easySolved}/${data.totalEasy} (${easyPercentage}%)`}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-white">Medium</h2>
          <p className="text-white">{`Solved: ${data.mediumSolved}/${data.totalMedium} (${mediumPercentage}%)`}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-white">Hard</h2>
          <p className="text-white">{`Solved: ${data.hardSolved}/${data.totalHard} (${hardPercentage}%)`}</p>
        </div>
      </div>
    </div>
  );
};

ArcDesign.propTypes = {
  data: PropTypes.shape({
    easySolved: PropTypes.number.isRequired,
    totalEasy: PropTypes.number.isRequired,
    mediumSolved: PropTypes.number.isRequired,
    totalMedium: PropTypes.number.isRequired,
    hardSolved: PropTypes.number.isRequired,
    totalHard: PropTypes.number.isRequired,
  }).isRequired,
};

export default ArcDesign;
