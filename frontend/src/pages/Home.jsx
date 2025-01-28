import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Home = () => {
  const [quote, setQuote] = useState("");
  const [contest, setContest] = useState([]);

  const userData = {
    name: "John Doe",
    usernames: { leetUser: "john123" },
    email: "john.doe@example.com",
    college: "XYZ University",
  };

  useEffect(() => {
    fetch('https://programming-quotesapi.vercel.app/api/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.author && data.quote) {
          setQuote(`${data.quote} — ${data.author}`);
        } else {
          setQuote("No quote available at the moment.");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch the quote:", error);
        setQuote("Perhaps the central problem we face in all of computer science is how we are to get to the situation where we build on top of the work of others rather than redoing so much of it in a trivially different way. — Richard Hamming");
      });
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      <div
        className="flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-0 border border-zinc-300 dark:border-zinc-800 rounded-3xl p-10 w-full sm:w-4/5 xl:w-[70%] mx-auto"
      >
        {/* Left Section */}
        <div className="flex items-center justify-center h-72 w-full xl:w-1/2">
          <img className="h-full object-contain rounded-5xl sm:rounded-3xl md:rounded-4xl" src={assets.AlgoMaster} alt="AlgoMasters" />
        </div>

        {/* Right Section */}
        <div
          className="flex flex-col items-center justify-between h-72 w-full xl:w-1/2 p-5 ml-2"
        >
          <div className="text-center">
            <h1 className="font-bold mt-3 text-2xl">{userData.name}</h1>
            <div className="flex flex-col items-center font-semibold mt-1 text-zinc-500 dark:text-gray-500 text-sm">
              <span>#{userData.usernames.leetUser}</span>
              <span>Rank: {data.ranking}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-6 w-full pl-10">
            <div className="flex gap-x-3 items-center">
              <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
                <img src={assets.Gmail} alt="Email" className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-zinc-600">Email</span>
                <span className="text-md font-semibold truncate">{userData.email}</span>
              </div>
            </div>
            <div className="flex gap-x-3 items-center">
              <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
                <img src={assets.college} alt="College" className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-zinc-600">College</span>
                <span className="text-md font-semibold truncate">{userData.college}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Motivation... */}
      <div className="flex flex-col items-center justify-center m-10">
        <div className="box text-white bg-white dark:bg-[#15171c] text-center text-lg sm:text-xl m-10 p-6 rounded-2xl border border-orange-200 hover:border-orange-400 hover:shadow-md hover:shadow-orange-200/30 transition-colors duration-300 ease-in-out">
          <p className="text-gray-800  dark:text-gray-300">{quote ? `"${quote}"` : "Loading quote..."}</p>
        </div>
      </div>

      <div className="flex font-semibold justify-center items-center gap-2 text-xl sm:text-4xl pt-5 pb-7">
        <h2 className="text-[#4387f2]">CodeForces</h2>
        <h2 className="text-[#ed4236]">Contests</h2>
      </div>

      <div className="flex flex-col xl:flex-row gap-20 items-center justify-center m-10">
        <div className="w-full text-gray-800 dark:text-gray-300 p-6 rounded-2xl border border-zinc-500 border-transparent hover:border-blue-200 hover:shadow-lg hover:shadow-indigo-500/40 hover:shadow-[0_0_15px_5px_rgba(75,0,130,0.7)] text-center transparent-bg">
          <h1 className="text-lg sm:text-2xl pb-2">Upcoming Contest 1</h1>
          {contest.length > 0 ? (
            <div className="text-lg" key={contest[0].id}>
              <h2>{`Contest 1: ${contest[0].name}`}</h2>
              <p>{`Start Time: ${new Date(contest[0].startTimeSeconds * 1000).toLocaleString()}`}</p>
              <p>{`Duration: ${contest[0].durationSeconds / 3600} hours`}</p>
              <button onClick={() => handleNavigate(contest[0].id)} className="mt-4 p-2 border border-gray-500 rounded-xl hover:bg-[#4387f2] hover:text-white transition-colors duration-500 ease-in-sine">
                Enter Contest
              </button>
            </div>
          ) : (
            <p>Loading contests...</p>
          )}
        </div>

        <div className="w-full text-gray-800 dark:text-gray-300 p-6 rounded-2xl border border-zinc-500 border-transparent hover:border-blue-200 hover:shadow-lg hover:shadow-indigo-500/40 text-center transparent-bg">
          <h1 className="text-lg sm:text-2xl pb-2">Upcoming Contest 2</h1>
          {contest.length > 1 ? (
            <div className="text-lg" key={contest[1].id}>
              <h2>{`Contest 1: ${contest[1].name}`}</h2>
              <p>{`Start Time: ${new Date(contest[1].startTimeSeconds * 1000).toLocaleString()}`}</p>
              <p>{`Duration: ${contest[1].durationSeconds / 3600} hours`}</p>
              <button onClick={() => handleNavigate(contest[0].id)} className="mt-4 p-2 border border-gray-500 rounded-xl hover:bg-[#4387f2] hover:text-white transition-colors duration-500 ease-in-sine">
                Enter Contest
              </button>
            </div>
          ) : (
            <p className="text-lg">There are no upcoming another Contests at the moment.</p>
          )}
        </div>
      </div>
      <div className="m-11 p-11 text-center sm:text-xl">
        <p className="m-10 p-10 italic">Empowering coders to track, grow, and challenge their problem-solving prowess across the world’s top platforms.</p>
      </div>

    </div>
  );
};

export default Home;

