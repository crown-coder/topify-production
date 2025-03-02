import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";

const Profile = ({ setIsSidebarOpen, toggleIconsOnly, iconsOnly }) => {
    const [isCardVisible, setIsCardVisible] = useState(false);

    const toggleCardVisibility = () => {
        setIsCardVisible((prev) => !prev);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-2 right-2 z-10 bg-white dark:bg-gray-800 transition-all duration-100 flex justify-between items-center 
        ${iconsOnly ? "lg:left-[80px] lg:w-[calc(100%-80px)]" : "lg:left-[240px] lg:w-[calc(100%-240px)]"} 
        w-full py-4 px-3 rounded-lg`}
        >

            {/* Menu Icon */}
            <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="block lg:hidden text-[#434343] px-4 py-2 rounded-lg dark:text-white"
            >
                <MdMenu size={24} />
            </button>
            <div className="flex gap-1 items-center">
                <button
                    onClick={toggleIconsOnly}
                    className="block max-lg:hidden text-[#434343] px-4 py-2 rounded-lg dark:text-white"
                >
                    <MdMenu size={24} />
                </button>
                <h2 className="text-lg font-semibold text-[#434343] dark:text-white">
                    Dashboard
                </h2>
            </div>
            <div className="flex gap-2 items-center">
                <div className="icon w-[40px] h-[40px] rounded-full bg-blue-300 flex items-center justify-center cursor-pointer max-lg:hidden">
                    <FaBell />
                </div>
                <div
                    className="flex gap-1 items-center relative cursor-pointer"
                    onClick={toggleCardVisibility}
                >
                    <h1 className="w-[40px] h-[40px] rounded-full bg-blue-300 dark:text-white flex items-center justify-center">
                        J
                    </h1>
                    <div className="max-lg:hidden">
                        <h4 className="text-sm dark:text-white">Jeff Grimes</h4>
                        <button
                            className="flex items-center justify-between w-[70px] text-[#A1A1A1] dark:text-white cursor-pointer text-sm"
                        >
                            User
                            <FaChevronDown />
                        </button>
                    </div>
                    <ProfileCard isVisible={isCardVisible} />
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
