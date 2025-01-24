import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const useCollegeRank = ({ username, college }) => {
  const [rankData, setRankData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegeRank = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:4000/api/user/college-rank/${username}/${college}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRankData(response.data.userRank);
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        setError("Failed to fetch college rank");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (username && college) {
      fetchCollegeRank();
    }
  }, [username, college]);

  return { rankData, totalUsers, error, loading };
};

useCollegeRank.propTypes = {
  username: PropTypes.string.isRequired,
  college: PropTypes.string.isRequired,
};

export default useCollegeRank;
