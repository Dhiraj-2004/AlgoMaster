import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LeetCodeDesign from "./LeetCodeDesign";
import CodeChefDesign from "./CodeChefDesign";
import CodeForcesDesign from "./CodeForcesDesign";
import { useNavigate } from "react-router-dom";

const MyProfile = ({ platformUser, apiEndpoint }) => {
  const [username, setUsername] = useState(null);
  const [data, setUserData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [userData, setuserData] = useState(null);
  const navigate = useNavigate();
  const [rankData, setRankData] = useState(null);



  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch username from backend
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setuserData(response?.data)
        const username = response.data?.platform;
        const fetchedUsername =
          platformUser === "leetcodeUser"
            ? username?.usernames?.leetcodeUser
            : platformUser === "codechefUser"
              ? username?.usernames?.codechefUser
              : platformUser === "codeforcesUser"
                ? username?.usernames?.codeforcesUser
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

        // codeForce solved problem
        let total = 0;
        if (platformUser === "codeforcesUser") {
          try {
            const codeforceResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
            const submissions = codeforceResponse.data.result;

            const solvedProblems = new Set();
            submissions.forEach((submission) => {
              if (submission.verdict === "OK") {
                const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
                solvedProblems.add(problemId);
              }
            });
            total = solvedProblems.size;
          }


          catch (error) {
            console.error("Error fetching Codeforces data:", error);
            total = 0
          }
        }

          const user = response?.data?.data;
          const easy = user?.matchedUser?.submitStats?.acSubmissionNum.find(
            (submission) => submission.difficulty === "Easy"
          )?.count || 0;

          const medium = user?.matchedUser?.submitStats?.acSubmissionNum.find(
            (submission) => submission.difficulty === "Medium"
          )?.count || 0;

          const hard = user?.matchedUser?.submitStats?.acSubmissionNum.find(
            (submission) => submission.difficulty === "Hard"
          )?.count || 0;

          const rank =
            platformUser === "leetcodeUser"
              ? Math.round(response?.data?.data?.userContestRanking?.rating)
              : platformUser === "codechefUser"
                ? response.data.currentRating
                : response.data.result?.[0]?.rating;

          // Update rank in backend with problem counts
          const token = localStorage.getItem("token");
          await axios.put(
            `${backendUrl}/api/user/rank`,
            { rank, platformUser, username, easy, medium, hard,total
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Error fetching user data:", error);
          setShowUpdateMessage(true);
        } finally {
          setLoader(false);
        }

        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${backendUrl}/api/user/college-rank/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRankData(response.data);
        } catch (error) {
          console.log(error)
        }
      };
      fetchUserData();
    }, [username, apiEndpoint, platformUser, backendUrl]);

  return (
    <div>
      {showUpdateMessage ? (
        <div className="flex flex-col gap-6 items-center justify-center mt-40 m-auto">
          <p className="text-red-500 font-semibold">Please Update Profile</p>
          <button className="custom-button h-14 w-48 my-1"
            onClick={() => navigate(`/user/${userData?.username}`)}
          >Go to Profile</button>
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
              rankData={rankData}
            />
          )}
          {platformUser === "codechefUser" && (
            <CodeChefDesign
              data={data}
              userData={userData}
              rankData={rankData}
            />
          )}
          {platformUser === "codeforcesUser" && (
            <CodeForcesDesign
              data={data}
              userData={userData}
              rankData={rankData}
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
