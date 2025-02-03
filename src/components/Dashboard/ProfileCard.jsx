import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfileCard = ({ isVisible, onToggleDarkMode, onLogout }) => {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-4"
        >
            <div className="w-full grid grid-cols-2 gap-2">
                <button className="w-full text-left py-2 px-3 rounded bg-slate-100 dark:bg-gray-800 shadow-sm flex justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FaBell />
                </button>
                <button
                    onClick={onToggleDarkMode}
                    className="w-full text-left py-2 px-3 rounded bg-slate-100 dark:bg-gray-800 shadow-sm flex justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <FaRegLightbulb />
                </button>
            </div>
            <button
                onClick={onLogout}
                className="w-full text-left py-2 px-3 shadow-sm flex justify-center border border-red-300 rounded-lg text-red-300 mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-2xl"
            >
                <CiLogout />
            </button>
        </motion.div>
    );
};

export default ProfileCard;
