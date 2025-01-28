
import PropTypes from "prop-types";
import ProgressContainer from "../component/ProgressContainer ";
import { assets } from "../assets/assets";
import useUserData from "../component/hook/useUserData";
import useCollegeRank from "../component/hook/useCollegeRank";


const LeetCodeDesign = ({ data }) => {
  const { userData, loading } = useUserData();
  const { rankData, totalUsers } = useCollegeRank({
    username: userData?.usernames?.leetcodeUser,
    college: userData?.college,
  });

  const User=data.data;

  const easySolved = User?.matchedUser?.submitStats?.acSubmissionNum.find(
    (submission) => submission.difficulty === "Easy"
  )?.count;
  const totaleasy=User?.allQuestionsCount?.find(q => q.difficulty === 'Easy')?.count

  const mediumSolved = User?.matchedUser?.submitStats?.acSubmissionNum.find(
    (submission) => submission.difficulty === "Medium"
  )?.count;
  const totalmedium = User?.allQuestionsCount?.find(q => q.difficulty === 'Medium')?.count;

  const hardSolved = User?.matchedUser?.submitStats?.acSubmissionNum.find(
    (submission) => submission.difficulty === "Hard"
  )?.count;
  const totalhard = User?.allQuestionsCount?.find(q => q.difficulty === 'Hard')?.count;


  return (
    <div>
      {/* Title */}
      <div className="flex font-semibold justify-center items-center text-xl sm:text-4xl pt-5 pb-7 mb-10">
        <h2 className="text-indigo-500">Leet</h2>
        <h2 className="text-orange-500">Code</h2>
      </div>
      <div className="w-full h-full flex flex-col xl:flex-row gap-10 items-center justify-center">
        {/* Info */}
        <div id="Card" className="flex flex-col items-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
          <div>
            <h1 className="font-bold mt-3 text-2xl">{userData ? userData.name : loading}</h1>
            <div className="flex flex-col items-center font font-semibold ml-3 mb-auto text-zinc-500 dark:text-gray-500 text-sm">
              <span>#{userData ? userData.usernames.leetcodeUser :loading}</span>
              <span>Rank: {Math.round(User?.userContestRanking?.rating)}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-6 mt-6">
            <div className="flex gap-x-2 items-center">
              <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
                <img src={assets.Gmail} alt="Email" className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-zinc-600">Email</span>
                <span className="text-md font-semibold truncate block">{userData?.email}</span>
              </div>
            </div>

            <div className="flex gap-x-2 items-center">
              <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
                <img src={assets.college} alt="College" className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-zinc-600">College</span>
                <span className="text-md font-semibold truncate block">{userData?.college}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leetcode Data */}
        <div id="Card" className="flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
          <ProgressContainer data={User} />
        </div>

        <div id="Card" className="flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72 gap-4">
          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#22C55E]">College Rank</span>
            <div>
              <span className="font-bold text-base">{rankData?.leetcodeRank || "Not Available"}</span>
              <span className="text-zinc-500 text-base">/{totalUsers}</span>
            </div>
          </div> 

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#22C55E]">Easy</span>
            <div>
              <span className="font-bold text-base">{easySolved}</span>
              <span className="text-zinc-500 text-base">/{totaleasy}</span>
            </div>
          </div>

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#EAB308]">Medium</span>
            <div>
              <span className="font-bold text-base">{mediumSolved}</span>
              <span className="text-zinc-500 text-base">/{totalmedium}</span>
            </div>
          </div>

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#F43F5E]">Hard</span>
            <div>
              <span className="font-bold text-base">{hardSolved}</span>
              <span className="text-zinc-500 text-base">/{totalhard}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

LeetCodeDesign.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LeetCodeDesign;
