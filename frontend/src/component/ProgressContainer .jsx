import PropTypes from "prop-types";
import CircularProgress from "./CircularProgress ";

const ProgressContainer = ({ data }) => {

  const easySolved = data?.matchedUser?.submitStats?.acSubmissionNum.find(
    (submission) => submission.difficulty === "Easy"
  )?.count;
  const totaleasy=data?.allQuestionsCount?.find(q => q.difficulty === 'Easy')?.count

  const mediumSolved = data?.matchedUser?.submitStats?.acSubmissionNum.find(
    (submission) => submission.difficulty === "Medium"
  )?.count;
  const totalmedium=data?.allQuestionsCount?.find(q => q.difficulty === 'Easy')?.count

  const hardSolved = data?.matchedUser?.submitStats?.acSubmissionNum.find(
    (submission) => submission.difficulty === "Hard"
  )?.count;
  const totalhard=data?.allQuestionsCount?.find(q => q.difficulty === 'Easy')?.count


  const easyPercentage = ((easySolved / totaleasy) * 100).toFixed(2);
  const mediumPercentage = ((mediumSolved / totalmedium) * 100).toFixed(2);
  const hardPercentage = ((hardSolved/ totalhard) * 100).toFixed(2);

  return (
    <div>
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
    matchedUser: PropTypes.shape({
      submitStats: PropTypes.shape({
        acSubmissionNum: PropTypes.arrayOf(
          PropTypes.shape({
            difficulty: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
          })
        ).isRequired,
      }).isRequired,
    }).isRequired,
    allQuestionsCount: PropTypes.arrayOf(
      PropTypes.shape({
        difficulty: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};


export default ProgressContainer;
