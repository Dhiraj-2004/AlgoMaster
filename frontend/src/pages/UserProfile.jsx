import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LeetCodeDesign from "./LeetCodeDesign";

const UserProfile = ({ platformUser, apiEndpoint, usernameEndpoint }) => {
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(usernameEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (platformUser === "leetUser") {
          setUsername(response.data.leetUser);
        } else if (platformUser === "codechefUser") {
          setUsername(response.data.codechefUser);
        } else if (platformUser === "codeforcesUser") {
          setUsername(response.data.codeforcesUser);
        }
      } catch (error) {
        setError("Failed to fetch username");
        console.log(error);
      }
    };
    fetchUsername();
  }, [usernameEndpoint, platformUser]);

  useEffect(() => {
    if (!username) return;
    const fetchUserData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`${apiEndpoint}/${username}`);
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data",error);
      } finally {
        setLoader(false);
      }
    };
    fetchUserData();
  }, [apiEndpoint, username]);

  return (
    <div>
      {loader ? (
        <div className="flex items-center justify-center mt-60">
        <div className="loader"></div>
        </div>
      ) : (
        <div>
         {platformUser === "leetUser" && <LeetCodeDesign data={userData}></LeetCodeDesign>}
          {/* <span>{username}</span>
          <br />
          <br />
          <pre>{JSON.stringify(userData, null, 2)}</pre> */}
        </div>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

UserProfile.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  usernameEndpoint: PropTypes.string.isRequired,
  platformUser: PropTypes.string.isRequired,
};

export default UserProfile;
