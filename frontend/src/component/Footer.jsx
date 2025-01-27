import { IoMail } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className="min-h-[200px] w-full bg-[#15171c] text-white">
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8 py-8 items-center">
                <div className="flex flex-col items-center gap-y-3 px-3 text-center xl:mt-7 lg:mt-7">
                <NavLink to="/">
                <div className="w-48 xl:w-48 lg:w-44 md:w-40 sm:w-40 flex justify-center items-center">
                    <h1 className="text-4xl lexend-bold">
                    <span className="text-orange-500">{`{`}</span>
                    <span className="text-indigo-500">Algo</span>
                    <span className="text-orange-500">Masters</span>
                    <span className="text-indigo-500">{`}`}</span>
                    </h1>
                </div>
                </NavLink>

                    <p className="text-sm max-w-[400px] font-normal sm:text-lg">The Ultimate Guide to Ace Success</p>
                </div>

                <div className="flex flex-col gap-y-3 text-center lg:text-base xl:mt-7 lg:mt-7 sm:text-xl">
                    <h1 className="font-medium text-center cursor-pointer">Quick Links</h1>
                    <div className="text-[#ABAFB8] flex flex-col cursor-pointer">
                        <a href="/#Navbar">Home</a>
                        <a href="/#Navbar">Contact</a>
                    </div>
                </div>

                <div className="flex flex-col gap-y-3 text-center lg:text-base xl:mt-7 lg:mt-7 sm:text-xl">
                    <h1 className="font-medium text-center">GET IN TOUCH</h1>
                    <div className="flex items-center gap-x-3 justify-center text-[#ABAFB8] cursor-pointer">
                        <IoMail className="w-5 h-5 cursor-pointer" />
                        <span>algomaster@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
