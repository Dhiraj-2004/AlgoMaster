import PropTypes from "prop-types";
import useAmcatRank from "../component/hook/useAmcatRank";
import { UsersIcon, UserIcon, TrophyIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { IdCard } from "lucide-react";
import { assets } from '../assets/assets';
import React, { useEffect, useState, } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ScoreCard from "../component/ScoreCard";



// Profile section
const Pofile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [amcatdata, setAmcatdata] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/${username}`);
        setUserData(response.data.user);
        setAmcatdata(response.data.user.usernames.amcatKey)
        console.log(amcatdata)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [username]);

  return (
    <div className="flex flex-col h-full justify-center items-center px-4 w-full">
      <div className="flex flex-col min-w-full md:flex-row gap-6">
        {/* User Data */}
        <div className="card flex flex-col items-start rounded-3xl border dark:border-zinc-800 p-4 w-full md:w-5/6 lg:w-11/12 xl:w-5/12">
          <InfoSection
            icon={<UserIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />}
            placeholder="Username:"
            data={userData?.username} />
          <InfoSection
            icon={<UserIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />}
            placeholder="Name:"
            data={userData?.name} />
          <InfoSection
            icon={assets.Gmail}
            placeholder="Email:"
            data={userData?.email} />
          <InfoSection
            icon={assets.Roll}
            placeholder="Roll:"
            data={userData?.roll} />
          <InfoSection
            icon={assets.Roll}
            placeholder="Registered ID:"
            data={userData?.registeredID} />
          <InfoSection
            icon={assets.college}
            placeholder="Department:"
            data={userData?.department} />
          <InfoSection
            icon={assets.Year}
            placeholder="Year:"
            data={userData?.year} />
          <InfoSection
            icon={assets.codechef}
            placeholder="CodeChef:"
            data={userData?.usernames?.codechef} />
          <InfoSection
            icon={assets.codeforce}
            placeholder="CodeForces:"
            data={userData?.usernames?.codeforces} />
          <InfoSection
            icon={assets.leetcode}
            placeholder="Leetcode:"
            data={userData?.usernames?.leetcode} />
          <InfoSection
            icon={assets.Amcat}
            placeholder="Amcat ID:"
            data={userData?.usernames?.amcatKey} />
        </div>

        {/* Platform Rankings */}
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col xl:flex-row gap-6">
            {/* Leetcode */}
            <div className="card flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-6 w-full md:w-5/6 lg:w-11/12 xl:w-5/12 h-64 gap-3">
              <h1 className="text-lg font-semibold">Leetcode</h1>
              <Section
                overallRank={userData?.collegeRank?.leetcode}
                totalUsers={userData?.totalUsers?.leetcode}
                departmentRank={userData?.departmentRank?.leetcode}
                departmentUsers={userData?.departmentUsers?.leetcode}
                currentRating={userData?.ranks?.leetcode} />
            </div>

            {/* CodeChef */}
            <div className="card flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-6 w-full md:w-5/6 lg:w-11/12 xl:w-5/12 h-64 gap-3">
              <h1 className="text-lg font-semibold">CodeChef</h1>
              <Section
                overallRank={userData?.collegeRank?.codechef}
                totalUsers={userData?.totalUsers?.codechef}
                departmentRank={userData?.departmentRank?.codechef}
                departmentUsers={userData?.departmentUsers?.codechef}
                currentRating={userData?.ranks?.codechef} />
            </div>

            {/* CodeForces */}
            <div className="card flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-6 w-full md:w-5/6 lg:w-11/12 xl:w-5/12 h-64 gap-3">
              <h1 className="text-lg font-semibold">CodeForces</h1>
              <Section
                overallRank={userData?.collegeRank?.codeforces}
                totalUsers={userData?.totalUsers?.codeforces}
                departmentRank={userData?.departmentRank?.codeforces}
                departmentUsers={userData?.departmentUsers?.codeforces}
                currentRating={userData?.ranks?.codeforces} />
            </div>
          </div>
          <div className="w-full hidden xl:flex">
            <Amcat amcatdata={amcatdata} />
          </div>
        </div>
      </div>

      <div className="w-full xl:hidden mt-6">
        <Amcat amcatdata={amcatdata} />
      </div>
    </div>
  )
}


const Section = ({ overallRank, totalUsers, departmentRank, departmentUsers, currentRating }) => {
  const getRankColor = (rank) => {
    if (rank === null || rank === undefined) return "text-gray-500";
    if (rank < 50) return "text-green-500";
    else if (rank < 150) return "text-yellow-500";
    else if (rank < 220) return "text-blue-500";
    return "text-red-500";
  };

  return (
    <>
      <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
        <span className={`font-bold text-md ${getRankColor(overallRank)}`}>College Rank</span>
        <div>
          <span className={`font-bold text-base ${getRankColor(overallRank)}`}>
            {overallRank || "Not Available"}
          </span>
          <span className="text-zinc-500 text-base">/{totalUsers}</span>
        </div>
      </div>

      <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
        <span className={`font-bold text-md ${getRankColor(departmentRank)}`}>Department Rank</span>
        <div>
          <span className={`font-bold text-base ${getRankColor(departmentRank)}`}>
            {departmentRank || "Not Available"}
          </span>
          <span className="text-zinc-500 text-base">/{departmentUsers}</span>
        </div>
      </div>

      <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
        <span className="font-bold text-md text-[#22C55E]">Current Rating</span>
        <span className="font-bold text-base text-[#22C55E]">{currentRating}</span>
      </div>
    </>
  );
};

const InfoSection = ({ icon, placeholder, data }) => {
  return (
    <>
      <div className="flex space-y-6 mt-6">
        <div className="flex gap-x-2 items-center">
          <div className=" bg-zinc-200 dark:bg-zinc-800 p-2 rounded-lg">
            {typeof icon === "string" ? (
              <img src={icon} alt="icon" className="w-6 h-6" />
            ) : (
              icon
            )}
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-sm font-medium text-zinc-400">{placeholder}</span>
            <span className="text-md font-semibold truncate block dark:text-zinc-200">{data}</span>
          </div>
        </div>
      </div>
    </>
  )
}


// Amcat data
const Amcat = ({ amcatdata }) => {
  const { amcatRank } = useAmcatRank(amcatdata);
  const amcatData = amcatRank ? amcatRank : null;

  const MetricCard = ({ label, value, delta }) => (
    <div className="bg-zinc-100 dark:bg-zinc-900 w-40 p-2 md:w-48 rounded-lg">
      <p className="text-sm text-gray-500 dark:text-zinc-300 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </span>
        {delta && (
          <span className={`text-sm ${delta > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {delta > 0 ? `▲ ${delta}` : `▼ ${Math.abs(delta)}`}
          </span>
        )}
      </div>
    </div>
  );

  // const ScoreCard = ({ label, value, max }) => {
  //   const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
  
  //   const getRankColor = (percentage) => {
  //     if (percentage === null || percentage === undefined || isNaN(percentage)) return "bg-gray-500";
  //     if (percentage > 65) return "bg-green-500";
  //     if (percentage > 50) return "bg-yellow-500";
  //     if (percentage > 40) return "bg-blue-500";
  //     return "bg-red-500";
  //   };
  
  //   return (
  //     <div className="bg-zinc-100 dark:bg-zinc-900 w-40 p-2 md:w-48 rounded-lg">
  //       <div className="flex justify-between items-center mb-2">
  //         <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
  //         <span className="text-sm font-semibold text-orange-400">{value}/{max}</span>
  //       </div>
  //       <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
  //         <div
  //           className={`h-full ${getRankColor(percentage)} transition-all duration-500`}
  //           style={{ width: `${percentage}%` }}
  //         />
  //       </div>
  //     </div>
  //   );
  // };
  

  const InfoBadge = ({ label, value, icon }) => (
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
      <span className="text-gray-400 dark:text-gray-500">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );

  const StatCard = ({ label, value, icon }) => (
    <div className="bg-zinc-100 dark:bg-zinc-900 w-full h-20 p-2 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </p>
      </div>
      <div className="p-3 bg-indigo-500/10 rounded-full">
        {React.cloneElement(icon, {
          className: "w-6 h-6 text-indigo-500 dark:text-indigo-400"
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {amcatRank && (
        <div className="card flex flex-col items-center rounded-3xl  dark:border-zinc-800 p-5 w-full md:w-[443.2px]">
          <div className="grid grid-cols-1 gap-8">
            {/* Profile Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-500/10 p-4 rounded-full">
                  <UserIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="manrope-bold text-2xl text-gray-800 dark:text-gray-100">
                    {amcatData?.userInfo?.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {amcatData?.userInfo?.rollNo}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <InfoBadge
                  label="AMCAT ID"
                  value={amcatData?.userInfo?.amcatID}
                  icon={<IdCard className="w-5 h-5" />}
                />
              </div>
            </div>

            {/* Ranks Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-500/10 p-4 rounded-full">
                  <TrophyIcon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Ranking Overview
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  label="ELQ Rank"
                  value={amcatRank.ranks?.elqRank}
                  delta={amcatRank.previousRanks?.elqRank}
                />
                <MetricCard
                  label="Automata Rank"
                  value={amcatRank.ranks?.automataRank}
                  delta={amcatRank.previousRanks?.automataRank}
                />
                <div className="col-span-2">
                  <StatCard
                    label="Total Users"
                    value={amcatRank.totalUsers}
                    icon={<UsersIcon className="w-5 h-5" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {amcatData && (
        <div className="card flex flex-col items-center rounded-3xl  dark:border-zinc-800 p-5 w-full md:w-[443px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-500/10 p-4 rounded-full">
              <ChartBarIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Detailed Scores
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ScoreCard
              label="ELQ Score"
              value={amcatData?.userInfo?.elqScore}
              max={300}
            />
            <ScoreCard
              label="C++"
              value={amcatData?.userInfo?.cppScore}
              max={100}
            />
            <ScoreCard
              label="Automata"
              value={amcatData?.userInfo?.automata}
              max={100}
            />
            <ScoreCard
              label="Quant"
              value={amcatData?.userInfo?.quant}
              max={100}
            />
            <ScoreCard
              label="English"
              value={amcatData?.userInfo?.english}
              max={100}
            />
            <ScoreCard
              label="Logical"
              value={amcatData?.userInfo?.logical}
              max={100}
            />
          </div>
        </div>
      )}

    </div>
  );
};

Amcat.propTypes = {
  amcatdata: PropTypes.object.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  max: PropTypes.any.isRequired,
  delta: PropTypes.any.isRequired,
};


Section.propTypes = {
  overallRank: PropTypes.number,
  totalUsers: PropTypes.number,
  departmentRank: PropTypes.number,
  departmentUsers: PropTypes.number,
  currentRating: PropTypes.number,
};

Section.defaultProps = {
  overallRank: null,
  totalUsers: null,
  departmentRank: null,
  departmentUsers: null,
  currentRating: null,
};


InfoSection.propTypes = {
  icon: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
};



export default Pofile