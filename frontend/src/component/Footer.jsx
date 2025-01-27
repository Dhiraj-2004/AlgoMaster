import { IoMail } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className="min-h-48 w-full mt-32 dark:bg-[#15171c] dark:border-zinc-600 border-t-2">
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 py-8 items-center">
                {/* Logo Section */}
                <div className="flex flex-col items-center gap-y-3 px-3 text-center">
                    <NavLink to="/">
                        <div className="w-48 flex justify-center items-center">
                            <h1 className="text-3xl lexend-bold">
                                <span className="text-orange-500">{`{`}</span>
                                <span className="text-indigo-500">Algo</span>
                                <span className="text-orange-500">Masters</span>
                                <span className="text-orange-500">{`}`}</span>
                            </h1>
                        </div>
                    </NavLink>
                    <p className="max-w-[400px] font-normal text-base">
                        The Ultimate Guide to Ace Success
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-y-3 text-center text-lg">
                    <h1 className="font-medium cursor-pointer">Quick Links</h1>
                    <div className="text-[#ABAFB8] flex flex-col cursor-pointer">
                        <NavLink to={"/home"}>Home</NavLink>
                        <NavLink to={"/contact"}>Contact</NavLink>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col gap-y-3 text-center text-lg">
                    <h1 className="font-medium">GET IN TOUCH</h1>
                    <div className="flex items-center gap-x-3 justify-center text-[#ABAFB8] cursor-pointer">
                        <IoMail className="w-5 h-5" />
                        <span>algomaster@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
