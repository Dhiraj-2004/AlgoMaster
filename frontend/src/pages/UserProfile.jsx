import axios from "axios";
import PropTypes from "prop-types";
import {  useEffect, useState } from "react";
import LeetCodeDesign from "./LeetCodeDesign";
import CodeChefDesign from "./CodeChefDesign";
import CodeForcesDesign from "./CodeForcesDesign";
import { NavLink } from "react-router-dom";

const UserProfile = ({ platformUser, apiEndpoint, usernameEndpoint }) => {
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // get username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(usernameEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (platformUser === "leetcodeUser") {
          setUsername(response.data.leetcodeUser);
        } else if (platformUser === "codechefUser") {
          setUsername(response.data.codechefUser);
        } else if (platformUser === "codeforcesUser") {
          setUsername(response.data.codeforcesUser);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setLoader(false);
      }
    };
    fetchUsername();
  }, [platformUser, usernameEndpoint]);

  // get userdata and rankset in data
  useEffect(() => {
    if (!username) return;
    const fetchUserData = async () => {
      try {
        setLoader(true)
        const response = await axios.get(`${apiEndpoint}/${username}`);
        setUserData(response.data);

        const rank =
          platformUser === "leetcodeUser"
            ? Math.round(response?.data?.data?.userContestRanking?.rating)
            : platformUser === "codechefUser"
              ? response.data.currentRating
              : response.data.result?.[0].rating;
        const token = localStorage.getItem("token");
        await axios.put(`${backendUrl}/api/user/rank`,
          { rank, platformUser, username },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchUserData();
  }, [username, apiEndpoint, platformUser,backendUrl]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowUpdateMessage(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loader ? (
        <div className="flex flex-col gap-6 items-center justify-center mt-40">
          <div className="loader"></div>
          {showUpdateMessage && (
            <NavLink
              to="/profile"
              className="text-blue-500 font-semibold hover:text-blue-700"
            >
              Please Update Profile
            </NavLink>
          )}
        </div>
      ) : (
        <div>
          {platformUser === "leetcodeUser" && <LeetCodeDesign data={userData} />}
          {platformUser === "codechefUser" && <CodeChefDesign data={userData} />}
          {platformUser === "codeforcesUser" && <CodeForcesDesign data={userData} />}
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  usernameEndpoint: PropTypes.string.isRequired,
  platformUser: PropTypes.string.isRequired,
};

export default UserProfile;
