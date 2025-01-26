import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import ProgressContainer from "../component/ProgressContainer ";

const Home = () => {
  const [quote, setQuote] = useState("");
  const [contest, setContest] = useState([]);

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

  // Fetching the daily quotes...
  useEffect(() => {
    fetch('https://api.quotable.io/quotes/random?tags=technology,famous-quotes')
      .then((response) => response.json())
      .then((data) => setQuote(data[0].content));
  }, []);

  useEffect(() => {
    async function fetchContests() {
      const apiUrl = "https://codeforces.com/api/contest.list";
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.status === "OK") {
          const upcoming = data.result
            .filter((contest) => contest.phase === "BEFORE")
            .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
            .slice(0, 2);
  
            setContest(upcoming);
        } else {
          console.error("Error fetching contests:", data.comment);
        }
      } catch (error) {
        console.error("Failed to fetch contest timings:", error);
      }
    }
  
    fetchContests();
  }, []);

  const handleNavigate = (contestId) => {
    window.open(`https://codeforces.com/contest/${contestId}`, "_blank");
  };
  
  
  return (
    <div className="w-full h-full">
      <div className="flex flex-col xl:flex-row gap-10 items-center justify-center">
        {/* Info */}
        <div className="box flex flex-col items-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
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
        <div className="box flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72">
          <ProgressContainer data={data} />
        </div>

        <div className="box flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-72 gap-4">
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

      {/* Motivation... */}
      <div className="flex flex-col items-center justify-center m-7">
        <div className="box bg-[#000004] text-white text-center text-lg sm:text-xl m-10 p-5 rounded-2xl border border-zinc-300 dark:border-zinc-800 animate-fill">
          {quote ? `"${quote}"` : "Loading quote..."}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 text-xl sm:text-4xl pt-5 pb-7">
        <h2 className="text-[#4387f2]">CodeForces</h2>
        <h2 className="text-[#ed4236]">Contests</h2>
      </div>

      <div className="flex flex-col xl:flex-row gap-20 items-center justify-center m-10">
        <div className="w-full p-6 text-white rounded-2xl border border-transparent hover:border-blue-500 hover:shadow-lg hover:shadow-indigo-500/25 text-center transparent-bg">
          <h1 className="text-lg sm:text-2xl pb-2">Upcoming Contest 1</h1>
          {contest.length > 0 ? (
            <div className="text-lg" key={contest[0].id}>
              <h2>{`Contest 1: ${contest[0].name}`}</h2>
              <p>{`Start Time: ${new Date(contest[0].startTimeSeconds * 1000).toLocaleString()}`}</p>
              <p>{`Duration: ${contest[0].durationSeconds / 3600} hours`}</p>
              <button onClick={() => handleNavigate(contest[0].id)} className="mt-4 p-2 border border-gray-500 rounded-xl hover:bg-[#4387f2] transition-colors duration-500 ease-in-sine">
                Enter Contest
              </button>
            </div>
          ) : (
            <p>Loading contests...</p>
          )}
        </div>

        <div className="w-full p-6 text-white rounded-2xl border border-transparent hover:border-blue-500 hover:shadow-lg hover:shadow-indigo-500/25 text-center transparent-bg">
          <h1 className="text-lg sm:text-2xl pb-2">Upcoming Contest 2</h1>
          {contest.length > 1 ? (
            <div className="text-lg" key={contest[1].id}>
              <h2>{`Contest 1: ${contest[1].name}`}</h2>
              <p>{`Start Time: ${new Date(contest[1].startTimeSeconds * 1000).toLocaleString()}`}</p>
              <p>{`Duration: ${contest[1].durationSeconds / 3600} hours`}</p>
              <button onClick={() => handleNavigate(contest[0].id)} className="mt-4 p-2 border border-gray-500 rounded-xl hover:bg-[#4387f2] transition-colors duration-500 ease-in-sine">
                Enter Contest
              </button>
            </div>
          ) : (
            <p className="text-lg">"There are no upcoming Contest 2 at the moment."</p>
          )}
        </div>
      </div>
      <div className="m-11 p-11 text-center sm:text-xl">
        <p className="m-10 p-10 italic">"Empowering coders to track, grow, and challenge their problem-solving prowess across the world’s top platforms."</p>
      </div>
    </div>
  );
};

export default Home;
