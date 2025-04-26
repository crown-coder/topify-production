import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdMenu } from "react-icons/md";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";

const Profile = ({ setIsSidebarOpen, toggleIconsOnly, iconsOnly }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCardVisible, setIsCardVisible] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/api2/user');
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const toggleCardVisibility = () => {
        setIsCardVisible((prev) => !prev);
    };

    // Get user initial from name
    const getUserInitial = () => {
        if (!user?.name) return "U";
        return user.name.charAt(0).toUpperCase();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-2 right-2 z-10 bg-white dark:bg-gray-800 transition-all duration-100 flex justify-between items-center 
                ${iconsOnly ? "lg:left-[80px] lg:w-[calc(100%-80px)]" : "lg:left-[240px] lg:w-[calc(100%-240px)]"} 
                w-full py-4 px-3 rounded-lg shadow-sm`}
        >
            {/* Menu Icon */}
            <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="block lg:hidden text-[#434343] px-4 py-2 rounded-lg dark:text-white"
                aria-label="Toggle sidebar"
            >
                <MdMenu size={24} />
            </button>

            <div className="flex gap-1 items-center">
                <button
                    onClick={toggleIconsOnly}
                    className="block max-lg:hidden text-[#434343] px-4 py-2 rounded-lg dark:text-white"
                    aria-label="Toggle icons only"
                >
                    <MdMenu size={24} />
                </button>
                <h2 className="text-lg font-semibold text-[#434343] dark:text-white">
                    Dashboard
                </h2>
            </div>

            <div className="flex gap-4 items-center">
                <button
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer max-lg:hidden"
                    aria-label="Notifications"
                >
                    <FaBell className="text-[#434343] dark:text-white" />
                </button>

                <div className="relative">
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={toggleCardVisibility}
                        aria-label="User profile"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-300 dark:bg-blue-500 text-white flex items-center justify-center font-medium">
                            {getUserInitial()}
                        </div>
                        <div className="max-lg:hidden">
                            <h4 className="text-sm dark:text-white">
                                {user ? user.name.split(" ")[0] : "User"}
                            </h4>
                            <div className="flex items-center text-[#A1A1A1] dark:text-gray-300 text-sm">
                                User <FaChevronDown className="ml-1" />
                            </div>
                        </div>
                    </div>

                    <ProfileCard
                        isVisible={isCardVisible}
                        onToggleDarkMode={() => { }} // Add your dark mode toggle function here
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;