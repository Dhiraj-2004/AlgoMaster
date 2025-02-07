import React from "react";
import useAmcatRank from "../component/hook/useAmcatRank";
import useUserData from "../component/hook/useUserData";
import { UsersIcon, UserIcon, TrophyIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { IdCard } from "lucide-react";

const Amcat = () => {
  const { userData, loading: userLoading, error: userError } = useUserData();
  const amcatdata = userData ? userData.amcat : null;
  const { amcatRank, error: rankError, loading: rankLoading } = useAmcatRank(amcatdata?.amcatID);
  const amcatData=amcatRank ? amcatRank : null;

  if (userLoading || rankLoading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center mt-20">
        <div className="loader"></div>
        <p className="text-red-500 font-semibold">Fetching AMCAT Data...</p>
      </div>
    );
  }

  if (userError || rankError) {
    return <p className="text-red-500 font-semibold">Error fetching data.</p>;
  }

  const MetricCard = ({ label, value, delta }) => (
    <div className="bg-gray-50/50 dark:bg-gray-800 p-4 rounded-lg">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
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
  
  const ScoreCard = ({ label, value, max }) => (
    <div className="bg-gray-50/50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <span className={`text-sm font-semibold text-orange-400`}>{value}/{max}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-green-400 dark:bg-green-600 transition-all duration-500`}
          style={{ width: `${(value/max)*100}%` }}
        />
      </div>
    </div>
  );
  
  const InfoBadge = ({ label, value, icon }) => (
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
      <span className="text-gray-400 dark:text-gray-500">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );

  const StatCard = ({ label, value, icon }) => (
    <div className="bg-gray-50/50 dark:bg-gray-800 p-4 rounded-lg flex items-center justify-between">
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
    <div className="manrope-regular p-8 max-w-4xl mx-auto rounded-lg shadow-lg transition-colors duration-300">
      
      {/* Title */}
      <div className="rajdhani-bold flex gap-2 justify-center text-3xl sm:text-4xl mb-12 pb-5">
        <span className="text-indigo-500">Amcat</span> 
        <span className="text-orange-500">Profile</span>
      </div>
  
      {amcatRank && (
        <div className="glowCard backdrop-blur-lg bg-white/60 dark:bg-zinc-900/80 p-6 rounded-xl shadow-lg mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <div className="glowCard backdrop-blur-lg bg-white/60 dark:bg-zinc-900/80 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-green-500/10 p-4 rounded-full">
              <ChartBarIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Detailed Scores
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default Amcat;
