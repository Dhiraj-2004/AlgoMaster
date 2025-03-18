import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import Title from './PageTitle';
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

const CodeChefGraph = ({ attendedContests }) => {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === "dark";
    const isMobile = useMediaQuery({ maxWidth: 640 });

    if (!attendedContests || attendedContests.length === 0) {
        return <div className="text-gray-500">No contest history available</div>;
    }

    const chartData = attendedContests
        .map(contest => ({
            ...contest,
            date: new Date(`${contest.getyear}-${contest.getmonth}-${contest.getday}`),
            rating: Number(contest.rating)
        }))
        .sort((a, b) => a.date - b.date);

    return (
        <div className="w-full h-auto px-4 sm:px-0">
            <Title text1="Rating" text2="History" />
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 400}>
                <LineChart data={chartData} margin={{ top: 5, right: isMobile ? 10 : 30, left: isMobile ? 10 : 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#333" : "#eee"} />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => format(date, "MMM yy")}
                        tick={{ fill: isDarkMode ? "#ddd" : "#666", fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis
                        tick={{ fill: isDarkMode ? "#ddd" : "#666", fontSize: isMobile ? 10 : 12 }}
                        label={{
                            value: "Rating",
                            angle: -90,
                            position: "left",
                            offset: 10,
                            style: { fill: isDarkMode ? "#ddd" : "#666", fontSize: isMobile ? 10 : 14 }
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="rating"
                        stroke={isDarkMode ? "#60a5fa" : "#2563eb"}
                        strokeWidth={2}
                        dot={{ r: isMobile ? 3 : 4, fill: isDarkMode ? "#60a5fa" : "#2563eb" }}
                        activeDot={{ r: isMobile ? 6 : 8, fill: isDarkMode ? "#60a5fa" : "#2563eb" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const contest = payload[0].payload;
        return (
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md border text-xs sm:text-sm">
                <h3 className="font-semibold text-indigo-500">{contest.name}</h3>
                <p className="text-xs sm:text-sm">{format(contest.date, 'MMM dd, yyyy')}</p>
                <p className="mt-1 sm:mt-2">Rating: <span className="font-medium text-orange-500">{contest.rating}</span></p>
                <p>Rank: {contest.rank || 'N/A'}</p>
            </div>
        );
    }
    return null;
};

// Prop validation
CodeChefGraph.propTypes = {
    attendedContests: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            getyear: PropTypes.string.isRequired,
            getmonth: PropTypes.string.isRequired,
            getday: PropTypes.string.isRequired,
            rating: PropTypes.string.isRequired,
            rank: PropTypes.string
        })
    ).isRequired
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array
};

export default CodeChefGraph;
