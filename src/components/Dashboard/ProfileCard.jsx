import React from "react";
import axios from "axios";
import { FaRegLightbulb, FaLightbulb, FaBell } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ isVisible, onToggleDarkMode }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`/api/logout`, {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // withCredentials: true,

            Cookies.remove("XSRF-TOKEN");
            Cookies.remove("topify_session");
            Cookies.remove("otp_verified_token");

            localStorage.removeItem("token");

            navigate("/login");
            window.location.reload();

        } catch (error) {
            console.error("Logout failed:", error);

            // Fallback: clear cookies and storage even if API fails
            Cookies.remove("XSRF-TOKEN");
            Cookies.remove("topify_session");
            Cookies.remove("otp_verified_token");
            localStorage.removeItem("token");

            // Redirect to login page
            navigate("/login");
            window.location.reload();
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-4 z-50"
        >
            <div className="w-full grid grid-cols-2 gap-2">
                <button
                    className="w-full text-left py-2 px-3 rounded bg-slate-100 dark:bg-gray-800 shadow-sm flex justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Notifications"
                >
                    <FaBell />
                </button>
                <button
                    onClick={onToggleDarkMode}
                    className="w-full text-left py-2 px-3 rounded bg-slate-100 dark:bg-gray-800 shadow-sm flex justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Toggle dark mode"
                >
                    {document.documentElement.classList.contains('dark') ?
                        <FaLightbulb /> :
                        <FaRegLightbulb />
                    }
                </button>
            </div>
            <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-3 shadow-sm flex justify-center border border-red-300 rounded-lg text-red-300 mt-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-2xl"
                aria-label="Logout"
            >
                <CiLogout />
            </button>
        </motion.div>
    );
};

export default ProfileCard;
