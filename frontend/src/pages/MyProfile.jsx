import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LeetCodeDesign from "./LeetCodeDesign";
import CodeChefDesign from "./CodeChefDesign";
import CodeForcesDesign from "./CodeForcesDesign";
import { NavLink } from "react-router-dom";
import useUserData from "../component/hook/useUserData";
import useCollegeRank from "../component/hook/useCollegeRank";

const MyProfile = ({ platformUser, apiEndpoint }) => {
  const [username, setUsername] = useState(null);
  const [data, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const { userData, loading } = useUserData();
  const { rankData, totalUsers, error } = useCollegeRank({
    username:
      platformUser === "leetcodeUser"
        ? userData?.usernames?.leetcodeUser
        : platformUser === "codechefUser"
        ? userData?.usernames?.codechefUser
        : platformUser === "codeforcesUser"
        ? userData?.usernames?.codeforcesUser
        : null,
    department: userData?.department,
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch username from backend
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usernames = response.data?.username;
        const fetchedUsername =
          platformUser === "leetcodeUser"
            ? usernames?.leetcodeUser
            : platformUser === "codechefUser"
            ? usernames?.codechefUser
            : platformUser === "codeforcesUser"
            ? usernames?.codeforcesUser
            : null;

        if (!fetchedUsername) {
          setShowUpdateMessage(true);
        }

        setUsername(fetchedUsername);
      } catch (error) {
        console.error("Error fetching username:", error);
        setShowUpdateMessage(true);
      }
    };

    fetchUsername();
  }, [backendUrl, platformUser]);

  // Fetch user data and update rank
  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`${apiEndpoint}/${username}`);
        setUserData(response.data);

        const rank =
          platformUser === "leetcodeUser"
            ? Math.round(response?.data?.data?.userContestRanking?.rating)
            : platformUser === "codechefUser"
            ? response.data.currentRating
            : response.data.result?.[0]?.rating;

        // Update rank in backend
        const token = localStorage.getItem("token");
        await axios.put(
          `${backendUrl}/api/user/rank`,
          { rank, platformUser, username },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
        setShowUpdateMessage(true);
      } finally {
        setLoader(false);
      }
    };

    fetchUserData();
  }, [username, apiEndpoint, platformUser, backendUrl]);

  return (
    <div>
      {showUpdateMessage ? (
        <div className="flex flex-col gap-6 items-center justify-center mt-40 m-auto">
          <p className="text-red-500 font-semibold">Please Update Profile</p>
          <NavLink
            to={`/user/${userData?.username}`}
            className="text-blue-500 font-semibold hover:text-blue-700"
          >
            Go to Profile
          </NavLink>
        </div>
      ) : loader ? (
        <div className="flex flex-col gap-6 items-center justify-center mt-40 m-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          {platformUser === "leetcodeUser" && (
            <LeetCodeDesign
              data={data}
              userData={userData}
              loading={loading}
              rankData={rankData}
              totalUsers={totalUsers}
            />
          )}
          {platformUser === "codechefUser" && (
            <CodeChefDesign
              data={data}
              userData={userData}
              loading={loading}
              rankData={rankData}
              totalUsers={totalUsers}
              error={error}
            />
          )}
          {platformUser === "codeforcesUser" && (
            <CodeForcesDesign
              data={data}
              userData={userData}
              loading={loading}
              rankData={rankData}
              totalUsers={totalUsers}
              error={error}
            />
          )}
        </div>
      )}
    </div>
  );
};

MyProfile.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  platformUser: PropTypes.string.isRequired,
};

export default MyProfile;
