import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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
        console.log("API Response:", response.data);
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchUserData();
  }, [apiEndpoint, username]);

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-16 gap-4">
      {loader ? (
        <div className="loader"></div>
      ) : (
        <div>
          <span>{username}</span>
          <br />
          <br />
          <pre>{JSON.stringify(userData, null, 2)}</pre>
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
