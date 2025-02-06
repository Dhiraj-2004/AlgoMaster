import PropTypes from "prop-types";
import { assets } from "../assets/assets";
import useUserData from "../component/hook/useUserData";
import useCollegeRank from "../component/hook/useCollegeRank";

const CodeForcesDesign = ({ data }) => {
  const { userData, loading } = useUserData();
  const { rankData, totalUsers, error } = useCollegeRank({
    username: userData?.usernames?.codeforcesUser,
    college: userData?.college
  });

  if (error) {
    return <div>{error}</div>;
  }
  const User = data?.result?.[0];

  return (
    <div className="manrope-regular ">
      {/* Title */}
      <div className="rajdhani-bold gap-0.5 flex font-semibold justify-center items-center text-xl sm:text-4xl pt-5 pb-7 mb-10">
        <h2 className="text-indigo-500">Code</h2>
        <h2 className="text-orange-500">Forces</h2>
      </div>
      <div className="w-full flex flex-col xl:flex-row gap-10 items-center justify-center">
        {/* Info */}
        <div className="card flex flex-col items-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
          <div>
            <h1 className="manrope-bold mt-3 text-2xl">{userData ? userData.name : loading}</h1>
            <div className="flex flex-col items-center font font-semibold ml-3 mb-auto text-zinc-500 dark:text-gray-500 text-sm">
              <span>
                #{userData ? userData.usernames.codeforcesUser : loading}
              </span>
              <span>
                  Rank : {userData ? User.rank : loading}
              </span>
            </div>
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

        {/* codeforce Data */}


        <div className="card flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72 gap-6">
          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
              <span className="font-bold text-md text-[#22C55E]">College Rank</span>
              <div>
                  <span className="font-bold text-base">{rankData?.codeforcesRank || "Not Available"}</span>
                  <span className="text-zinc-500 text-base">/{totalUsers}</span>
              </div>
          </div> 

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#22C55E]">Current Rating</span>
            <span className="font-bold text-base">{User.rating}</span>
          </div>

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#EAB308]">Highest Rating</span>
            <span className="font-bold text-base">{User.maxRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CodeForcesDesign.propTypes = {
    data: PropTypes.array.isRequired,
  };

export default CodeForcesDesign;
