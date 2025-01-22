import PropTypes from "prop-types";
import ProgressContainer from "../component/ProgressContainer ";
import { assets } from "../assets/assets";
import useUserData from "../component/hook/useUserData";

const LeetCodeDesign = ({ data }) => {
  const {userData,loading}=useUserData();
  return (
    <div className="w-full flex flex-col xl:flex-row gap-10 items-center justify-center">
      {/* Info */}
      <div className="flex flex-col items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
        <div>
          <h1 className="font-bold mt-3 text-2xl">{userData ? userData.name : loading}</h1>
          <span className="font font-semibold ml-3 mb-auto text-zinc-500 dark:text-gray-500 text-sm">
            #{userData ? userData.usernames.leetUser : loading}
          </span>
        </div>
        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex gap-x-2 items-center">
            <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
              <img src={assets.Gmail} alt="Email" className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-sm font-medium text-zinc-600">Email</span>
              <span className="text-md font-semibold truncate block">
                {userData ? userData.email : loading}
              </span>
            </div>
          </div>

          <div className="flex gap-x-2 items-center">
            <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
              <img src={assets.college} alt="College" className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-sm font-medium text-zinc-600">College</span>
              <span className="text-md font-semibold truncate block">
                {userData ? userData.college : loading}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Leetcode Data */}
      <div className="flex flex-col xl:flex-row gap-10 w-full xl:w-auto items-center justify-center">
        <div className="flex flex-row items-center justify-center m-auto rounded-lg border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 h-72 mr-auto">
          <ProgressContainer data={data} />
        </div>

        <div className="flex flex-col space-y-8 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 h-72">
          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#22C55E]">Easy</span>
            <div>
              <span className="font-bold text-base">{data.easySolved}</span>
              <span className="text-zinc-500 text-base">/{data.totalEasy}</span>
            </div>
          </div>

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#EAB308]">Medium</span>
            <div>
              <span className="font-bold text-base">{data.mediumSolved}</span>
              <span className="text-zinc-500 text-base">/{data.totalMedium}</span>
            </div>
          </div>

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#F43F5E]">Hard</span>
            <div>
              <span className="font-bold text-base">{data.hardSolved}</span>
              <span className="text-zinc-500 text-base">/{data.totalHard}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LeetCodeDesign.propTypes = {
  data: PropTypes.string.isRequired,
};

export default LeetCodeDesign;
