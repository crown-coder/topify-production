import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full fixed top-0 left-0 backdrop-blur-lg px-12 py-5 flex items-center justify-between z-50"
        >
            {/* Left Nav Links */}
            <div className="flex gap-6 text-white text-lg">
                {["Home", "About", "Why Choose Us"].map((item, index) => (
                    <NavLink key={index} to={item.toLowerCase().replace(/\s/g, "-")}>
                        {item}
                    </NavLink>
                ))}
            </div>

            {/* Logo */}
            <div>
                <Link to="/">
                    <motion.h2
                        whileHover={{ scale: 1.1 }}
                        className="text-2xl font-bold text-[#057DD1] cursor-pointer"
                    >
                        SmartDataLinks
                    </motion.h2>
                </Link>
            </div>

            {/* Right Nav Links */}
            <div className="flex gap-6 text-white text-lg">
                {["Pricing", "FAQs", "Contact Us"].map((item, index) => (
                    <NavLink key={index} to={item.toLowerCase().replace(/\s/g, "-")}>
                        {item}
                    </NavLink>
                ))}
            </div>
        </motion.header>
    );
};

/* Custom NavLink Component with Hover Animation */
const NavLink = ({ to, children }) => (
    <motion.div whileHover={{ scale: 1.1 }}>
        <Link to={`/${to}`} className="relative group">
            {children}
            {/* Underline Animation */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00eaff] group-hover:w-full transition-all duration-300"></span>
        </Link>
    </motion.div>
);

export default Navbar;
