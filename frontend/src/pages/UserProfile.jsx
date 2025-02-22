import axios from "axios";
import PropTypes from "prop-types";
import {  useEffect, useState } from "react";
import LeetCodeDesign from "./LeetCodeDesign";
import CodeChefDesign from "./CodeChefDesign";
import CodeForcesDesign from "./CodeForcesDesign";
import { NavLink } from "react-router-dom";
import useUserData from "../component/hook/useUserData";

const UserProfile = ({ platformUser, apiEndpoint }) => {
  const {userData}=useUserData();
  const [username, setUsername] = useState(null);
  const [data, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // get username

  useEffect(() => {
    if (!userData || !userData.usernames) return;
    const user = userData.usernames;

    setUsername(
      platformUser === "leetcodeUser"
        ? user.leetcodeUser
        : platformUser === "codechefUser"
        ? user.codechefUser
        : platformUser === "codeforcesUser"
        ? user.codeforcesUser
        : null
    );
  }, [userData, platformUser]);

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
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loader ? (
        <div className="flex flex-col gap-6 items-center justify-center mt-40 m-auto">
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
          {platformUser === "leetcodeUser" && <LeetCodeDesign data={data} />}
          {platformUser === "codechefUser" && <CodeChefDesign data={data} />}
          {platformUser === "codeforcesUser" && <CodeForcesDesign data={data} />}
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
