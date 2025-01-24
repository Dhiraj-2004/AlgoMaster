import { assets } from "../assets/assets";
import ProgressContainer from "../component/ProgressContainer "
const Home = () => {
  const userData = {
    name: "John Doe",
    usernames: { leetUser: "john123" },
    email: "john.doe@example.com",
    college: "XYZ University",
  };

  // Hardcoded values for rank data
  const rankData = {
    leetRank: 1,
  };
  const totalUsers = 9;

  // Hardcoded values for Leetcode data
  const data = {
    ranking: 5,
    easySolved: 45,
    totalEasy: 50,
    mediumSolved: 30,
    totalMedium: 40,
    hardSolved: 15,
    totalHard: 20,
  };

  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-10 items-center justify-center">
      {/* Info */}
      <div id="Card" className="flex flex-col items-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
        <div>
          <h1 className="font-bold mt-3 text-2xl">{userData.name}</h1>
          <div className="flex flex-col items-center font font-semibold ml-3 mb-auto text-zinc-500 dark:text-gray-500 text-sm">
            <span>#{userData.usernames.leetUser}</span>
            <span>Rank: {data.ranking}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex gap-x-2 items-center">
            <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
              <img src={assets.Gmail} alt="Email" className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-sm font-medium text-zinc-600">Email</span>
              <span className="text-md font-semibold truncate block">{userData.email}</span>
            </div>
          </div>

          <div className="flex gap-x-2 items-center">
            <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
              <img src={assets.college} alt="College" className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-sm font-medium text-zinc-600">College</span>
              <span className="text-md font-semibold truncate block">{userData.college}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leetcode Data */}
      <div id="Card" className="flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
        <ProgressContainer data={data} />
      </div>

      <div id="Card" className="flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72 gap-4">
        <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
          <span className="font-bold text-md text-[#22C55E]">College Rank</span>
          <div>
            <span className="font-bold text-base">{rankData.leetRank || "Not Available"}</span>
            <span className="text-zinc-500 text-base">/{totalUsers}</span>
          </div>
        </div> 

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
  );
};

export default Home