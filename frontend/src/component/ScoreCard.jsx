import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ScoreCard = ({ label, value, max }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedPercentage(percentage), 200);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const getRankColor = (percentage) => {
    if (percentage > 65) return "#22c55e";
    if (percentage > 50) return "#eab308";
    if (percentage > 40) return "#3b82f6";
    return "#ef4444";
  };

  return (
    <div className="bg-gray-50/50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-sm font-semibold text-orange-400">{value}/{max}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%", backgroundColor: "#ef4444" }}
          animate={{ 
            width: `${animatedPercentage}%`, 
            backgroundColor: getRankColor(animatedPercentage) 
          }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="h-full"
        />
      </div>
    </div>
  );
};

ScoreCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

ScoreCard.defaultProps = {
  label: "Score",
  value: 0,
  max: 100,
};

export default ScoreCard;
