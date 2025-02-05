import React from 'react';
import useUserData from '../component/hook/useUserData';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userData, loading } = useUserData();
  const navigate = useNavigate();
  // const rollNo = userData.amcat.rollNo;
  // const firstChar = parseInt(rollNo.charAt(0), 10) - 1;

  // const Years = [
  //   "First Year",
  //   "Second Year",
  //   "Third Year",
  //   "Last Year"
  // ];


  return (
    <div className="manrope-regular max-w-4xl mx-auto p-5 rounded-lg shadow-lg mt-5">
      {/* Title */}
      <div className="rajdhani-bold font-bold text-center text-3xl sm:text-4xl mb-12 pb-5">
        <span className="text-indigo-500">User</span> <span className="text-orange-500">Profile</span>
      </div>

      {/* Profile Info */}
      <div className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/80 p-6 rounded-lg shadow-sm dark:shadow-gray-900/30 border border-gray-200/50 dark:border-gray-700/50 flex flex-col gap-4 md:flex-row justify-between">        
      {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-5">
          <div className="w-max p-2 ml-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
            <h2 className='rajdhani-bold text-2xl font-semi-bold text-gray-800 dark:text-gray-300'>
              User Data
            </h2>
          </div>
  
          <div className="flex pt-3">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className="h-5" src={assets.Profile_icon} alt="Profile Icon" />
              </div>
              <p>Name :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.name : loading}</span>
          </div>

          <div className="flex">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-5 font-bold' src={assets.Gmail} alt="Gamil Icon" />
              </div>
              <p>Email :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.email : loading}</span>
          </div>

          <div className="flex flex-col">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-6 font-bold' src={assets.college} alt="Profile Icon" />
              </div>
              <p>College Name :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-10 dark:text-white">{userData ? userData.college : loading}</span>
          </div>

          <div className="flex">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-6 font-bold' src={assets.Year} alt="Profile Icon" />
              </div>
              <p>Year :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.year : loading}</span>
          </div>

          <div className="flex">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-5 font-bold' src={assets.Roll} alt="Profile Icon" />
              </div>
              <p>Roll :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.roll : loading}</span>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="w-full md:w-1/2 space-y-5">
          <div className="w-max p-2 ml-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
            <h2 className='rajdhani-bold text-2xl font-semi-bold text-gray-800 dark:text-gray-300'>
              Usernames
            </h2>
          </div>

          <div className="flex pt-3">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-5 font-bold' src={assets.leetcode} alt="Profile Icon" />
              </div>
              <p>LeetCode :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.usernames.leetcodeUser : loading}</span>
          </div>

          <div className="flex">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-5 font-bold' src={assets.codechef} alt="Profile Icon" />
              </div>
              <p>CodeChef :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.usernames.codechefUser : loading}</span>
          </div>

          <div className="flex">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-5 font-bold' src={assets.codeforce} alt="Profile Icon" />
              </div>
              <p>CodeForces :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.usernames.codeforcesUser : loading}</span>
          </div>

          <div className="flex">
            <div className="text-gray-600 dark:text-gray-300 font-semibold flex flex-row gap-1 items-center">
              <div className="w-8 h-8 mr-1 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <img className='h-5 font-bold' src={assets.Amcat} alt="Profile Icon" />
              </div>
              <p>Amcat ID :</p>
            </div>
            <span className="text-gray-900 flex items-center pl-2 dark:text-white">{userData ? userData.amcat.amcatID : loading}</span>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center my-10'>
      <button
        type="button"
        className="text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 
        font-medium text-sm md:text-lg px-3 md:px-5 py-1.5 md:py-3 text-center w-20 md:w-28 h-10 md:h-12 
        rounded-2xl transition-all duration-300 ease-in-out"
        onClick={() => navigate("/update")}
      >
        Update
      </button>
      </div>

    </div>
  );
};

export default Profile;
