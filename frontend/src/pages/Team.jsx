import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer } from 'react-icons/fa';
import Title from '../component/PageTitle';
import { assets } from '../assets/assets';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Dhiraj Ingale',
      role: 'Full Stack Developer',
      image: assets.member1,
      shortDesc: 'Full-stack developer skilled in crafting intuitive user interfaces and robust data systems. Effective problem-solver passionate about seamless user experiences.',
      social: {
        github: 'https://github.com/Dhiraj-2004',
        linkedin: 'https://www.linkedin.com/in/dhiraj-ingale-20di76/',
        email: 'mailto:idhiraj2204@gmail.com'
      }
    },
    {
      id: 2,
      name: 'Mahesh Pokale',
      role: 'Full Stack Developer',
      image: assets.Student2,
      shortDesc: 'Full-stack developer specializing in building efficient APIs and scalable solutions. Proven problem-solver with a focus on optimized system performance.',
      social: {
        github: 'https://github.com/MaheshPokale99',
        linkedin: 'https://www.linkedin.com/in/maheshpokale99/',
        email: 'mailto:pokalemahesh98@gmail.com'
      }
    }
  ];

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Title text1="Development" text2="Team" />
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="group flex flex-col items-center p-8 rounded-3xl transition-all duration-500 hover:transform hover:scale-105 shadow-xl hover:shadow-2xl dark:shadow-gray-900/30 relative overflow-hidden"
            >
              {/* Profile Image with Glow */}
              <div className="relative mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="rounded-full p-1.5 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800">
                  <img
                    className="w-48 h-48 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-4 space-y-2">
                <h2 className="text-3xl p-1 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                  {member.name}
                </h2>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {member.role}
                  </span>
                  <div className="flex space-x-2 text-blue-600 dark:text-blue-400">
                    <FaCode className="animate-pulse" />
                    <FaServer className="animate-pulse delay-75" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {member.shortDesc}
                </p>
              </div>

              {/* Social Links with Fixed Hover */}
              <div className="flex space-x-5 mt-4">
                <a
                  href={member.social.github}
                  className="p-3 rounded-full bg-gray-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-blue-900 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-white transition-colors" />
                </a>
                <a
                  href={member.social.linkedin}
                  className="p-3 rounded-full bg-gray-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-blue-900 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-white transition-colors" />
                </a>
                <a
                  href={member.social.email}
                  className="p-3 rounded-full bg-gray-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-blue-900 transition-all duration-300"
                >
                  <FaEnvelope className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='text-center mt-20 pt-10'>
        <h2 className="manrope-bold text-lg sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            Get Involved
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            We’re constantly looking for ways to improve our platform. If you have suggestions, feature requests, or feedback, we’d love to hear from you. Contact us at <a href="mailto:algomasters25@gmail.com" className="text-orange-600 dark:text-orange-400 underline">algomasters25@gmail.com</a>.
        </p>
      </div>

    </div>
  );
};

export default Team;