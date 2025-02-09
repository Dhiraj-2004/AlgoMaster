import useUserData from '../component/hook/useUserData';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import Title from '../component/PageTitle';

const Profile = () => {
  const { userData, loading } = useUserData();
  const navigate = useNavigate();

  // Helper function to render user details
  const renderUserData = (label, value, icon) => (
    <div className="flex gap-2 sm:gap-3 items-center">
      <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800">
        <img className="h-4 sm:h-6" src={icon} alt={label} />
      </div>
      <div className="text-sm sm:text-lg flex items-center gap-2 flex-wrap">
        <p className="text-zinc-800 dark:text-zinc-100 font-semibold whitespace-nowrap">{label}:</p>
        <span className="text-gray-900 dark:text-white break-words">{value || loading}</span>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center min-h-screen px-4 w-full">
      <div className="manrope-regular mx-auto p- rounded-lg shadow-lg max-w-6xl xl:[70%] sm:w-[100%]">
        {/* Title */}
        <Title text1="User" text2="Profile" />

        {/* Profile Info */}
        <div className="glowCardbig backdrop-blur-lg bg-white/60 dark:bg-zinc-950 p-4 sm:p-6 pb-6 sm:pb-8 rounded-lg shadow-sm">

          {/* Left Section */}
          <div className='flex flex-col lg:flex-row justify-center gap-20'>
            <div className="space-y-4 sm:space-y-6">

              <div className="w-40 p-1 sm:p-2 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-zinc-800 mx-auto">
                <h2 className="manrope-bold text-base sm:text-2xl font-semibold text-zinc-800 dark:text-gray-300">User Data</h2>

              </div>

              {renderUserData('Name', userData?.name, assets.Profile_icon)}
              {renderUserData('Email', userData?.email, assets.Gmail)}
              {renderUserData('College', userData?.college, assets.college)}
              {renderUserData('Year', userData?.year, assets.Year)}
              {renderUserData('Roll', userData?.roll, assets.Roll)}
            </div>

            {/* Right Section */}
            <div className="space-y-4 sm:space-y-6">

              <div className="w-40 p-1 sm:p-2 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-zinc-800 mx-auto">
                <h2 className="manrope-bold text-base sm:text-2xl font-semibold text-zinc-800 dark:text-gray-300">Usernames</h2>
              </div>

              {renderUserData('LeetCode', userData?.usernames?.leetcodeUser, assets.leetcode)}
              {renderUserData('CodeChef', userData?.usernames?.codechefUser, assets.codechef)}
              {renderUserData('CodeForces', userData?.usernames?.codeforcesUser, assets.codeforce)}
              {renderUserData('Amcat ID', userData?.amcat?.amcatID, assets.Amcat)}
            </div>
          </div>

        </div>

        {/* Update Button */}
        <div className="w-full flex justify-center mt-6 sm:mt-8">
          <button
            type="button"
            className="gradient-button px-5 py-2 sm:px-7 sm:py-3 text-sm sm:text-xl"
            onClick={() => navigate("/update")}
          >
            <span className='gradient-button-text'>Update</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
