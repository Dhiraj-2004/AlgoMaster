import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import Title from "./PageTitle";
import { ThemeContext } from "../context/ThemeContext";

const CodeForcesRatingGraph = ({ handle }) => {
  const [ratingHistory, setRatingHistory] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const fetchRatingHistory = async () => {
      try {
        const response = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const data = response.data.result.map((entry) => ({
          contestTitle: entry.contestName,
          date: new Date(entry.ratingUpdateTimeSeconds * 1000),
          rating: entry.newRating,
          rank: entry.rank,
          oldRating: entry.oldRating,
        }));
        setRatingHistory(data);
      } catch (error) {
        console.error("Error fetching CodeForces rating history:", error);
      }
    };

    fetchRatingHistory();
  }, [handle]);

  if (!ratingHistory || ratingHistory.length === 0) {
    return <div className="text-gray-500">No contest history available</div>;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const contest = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md border">
          <h3 className="font-semibold text-indigo-500">{contest.contestTitle}</h3>
          <p className="text-sm">{format(contest.date, "MMM dd, yyyy")}</p>
          <p className="mt-2">
            Rating: <span className="font-medium text-orange-500">{contest.rating}</span>
          </p>
          <p>Rank: {contest.rank?.toLocaleString() || "N/A"}</p>
          <p>Old Rating: {contest.oldRating}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <Title text1="Rating" text2="History" />
      <ResponsiveContainer width="95%" height="90%">
        <LineChart data={ratingHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              style: { fill: isDarkMode ? "#ddd" : "#666" },
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

export default CodeForcesRatingGraph;
