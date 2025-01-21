import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user stats from your Node.js backend
  const fetchUserStats = async (username) => {
    try {
      const response = await axios.post("http://localhost:5000/fetch-stats", {
        username,
      });
      setUserStats(response.data.data.matchedUser);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user stats (replace 'your-username' with actual LeetCode username)
    fetchUserStats("Believe7");
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userStats) {
    return <div>No data available</div>;
  }

  const { submitStatsGlobal, problemsSolvedBeatsStats } = userStats;

  // Donut chart data
  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Easy").count,
          submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Medium").count,
          submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Hard").count,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        hoverBackgroundColor: ["#16a34a", "#eab308", "#dc2626"],
        borderColor: "#1f2937",
        borderWidth: 4,
        cutout: "70%", // makes it a donut chart
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          problemsSolvedBeatsStats.find((item) => item.difficulty === "Easy").percentage,
          problemsSolvedBeatsStats.find((item) => item.difficulty === "Medium").percentage,
          problemsSolvedBeatsStats.find((item) => item.difficulty === "Hard").percentage,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        hoverBackgroundColor: ["#16a34a", "#eab308", "#dc2626"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 min-h-screen p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* User Stats */}
        <div className="text-center text-white text-2xl mb-4">
          <h2 className="font-bold">{userStats.username}</h2>
          <p>LeetCode Stats</p>
        </div>

        {/* Donut Chart for Submissions */}
        <div className="mb-6">
          <h3 className="text-white mb-2 text-lg">Problem Solved</h3>
          <Doughnut data={data} />
        </div>

        {/* Pie Chart for Problem Solved Percentage */}
        <div>
          <h3 className="text-white mb-2 text-lg">Problem Solved Percentage</h3>
          <Doughnut data={pieData} />
        </div>

        {/* Stats Display */}
        <div className="mt-4 text-white">
          <div>
            <span className="font-bold">Easy: </span>
            {submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Easy").count}/
            {submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Easy").submissions}
          </div>
          <div>
            <span className="font-bold">Medium: </span>
            {submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Medium").count}/
            {submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Medium").submissions}
          </div>
          <div>
            <span className="font-bold">Hard: </span>
            {submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Hard").count}/
            {submitStatsGlobal.acSubmissionNum.find((item) => item.difficulty === "Hard").submissions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
