import { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import Title from './PageTitle';
import { ThemeContext } from "../context/ThemeContext";

const LeetCodeRatingGraph = ({ attendedContests }) => {
  const { theme } = useContext(ThemeContext);
  if (!attendedContests || attendedContests.length === 0) {
    return <div className="text-gray-500">No contest history available</div>;
  }

  const isDarkMode = theme === "dark";

  const chartData = attendedContests
    .map(contest => ({
      ...contest,
      date: new Date(contest.startTime * 1000),
      rating: Number(contest.rating.toFixed(2))
    }))
    .sort((a, b) => a.date - b.date);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const contest = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md border">
          <h3 className="font-semibold text-indigo-500">{contest.contestTitle}</h3>
          <p className="text-sm">
            {format(contest.date, 'MMM dd, yyyy')}
          </p>
          <p className="mt-2">
            Rating: <span className="font-medium text-orange-500">{contest.rating}</span>
          </p>
          <p>
            Solved: {contest.problemsSolved}/{contest.totalProblems}
          </p>
          <p>
            Rank: {contest.ranking?.toLocaleString() || 'N/A'}
          </p>
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(PropTypes.shape({
      payload: PropTypes.shape({
        contestTitle: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        rating: PropTypes.number,
        problemsSolved: PropTypes.number,
        totalProblems: PropTypes.number,
        ranking: PropTypes.number,
      })
    })),
  };

  return (
    <div className="w-full h-96">
      <Title text1="Rating" text2="History" />
      <ResponsiveContainer width="95%" height="90%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#333" : "#eee"} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), "MMM yy")}
            tick={{ fill: isDarkMode ? "#ddd" : "#666" }}
          />
          <YAxis
            tick={{ fill: isDarkMode ? "#ddd" : "#666" }}
            label={{
              value: "Rating",
              angle: -90,
              position: "left",
              offset: 10,
              style: { fill: isDarkMode ? "#ddd" : "#666" }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke={isDarkMode ? "#60a5fa" : "#2563eb"}
            strokeWidth={2}
            dot={{ r: 4, fill: isDarkMode ? "#60a5fa" : "#2563eb" }}
            activeDot={{ r: 8, fill: isDarkMode ? "#60a5fa" : "#2563eb" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

LeetCodeRatingGraph.propTypes = {
  attendedContests: PropTypes.arrayOf(PropTypes.shape({
    contestTitle: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    problemsSolved: PropTypes.number.isRequired,
    totalProblems: PropTypes.number.isRequired,
    ranking: PropTypes.number,
  })),
};

export default LeetCodeRatingGraph;