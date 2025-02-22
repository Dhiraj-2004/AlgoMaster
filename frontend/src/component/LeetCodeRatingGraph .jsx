import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const LeetCodeRatingGraph = ({ attendedContests }) => {
  if (!attendedContests || attendedContests.length === 0) {
    return <div className="text-gray-500">No contest history available</div>;
  }

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
        <div className="bg-white p-3 rounded-lg shadow-md border">
          <h3 className="font-semibold">{contest.contestTitle}</h3>
          <p className="text-sm">
            {format(contest.date, 'MMM dd, yyyy')}
          </p>
          <p className="mt-2">
            Rating: <span className="font-medium">{contest.rating}</span>
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

  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-semibold mb-4">Contest Rating History</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM yy')}
            tick={{ fill: '#666' }}
          />
          <YAxis
            tick={{ fill: '#666' }}
            label={{
              value: 'Rating',
              angle: -90,
              position: 'left',
              offset: 10,
              style: { fill: '#666' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4, fill: '#2563eb' }}
            activeDot={{ r: 8, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeetCodeRatingGraph;