import React from "react";
import { motion } from "framer-motion";
import Laptop from "../../assets/newHome/laptop.png";
import Users from "../../assets/home/users.png"
import { MdOutlineDownload } from "react-icons/md";
import GlowingButton from "./GlowingButton";
import ScrollingLogos from "../newHome/ScrollingLogos";
const HeroSection = () => {
    return (
        <motion.section
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen pt-16 px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative"
        >
            {/* Glassmorphic Effect */}
            <div className="rounded-2xl p-10 max-w-3xl text-white">
                {/* Animated Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl max-lg:text-3xl font-medium leading-tight"
                >
                    The{" "}
                    <motion.span
                        className="text-[#057DD1] relative inline-block"
                        animate={{
                            backgroundImage: [
                                "linear-gradient(90deg, transparent 0%, #00eaff 50%, transparent 100%)",
                            ],
                            backgroundSize: ["200% 100%"],
                            backgroundPosition: ["-200% 0%", "200% 0%"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Best
                    </motion.span>{" "}
                    choice
                    for your Virtual{" "}
                    <motion.span
                        className="text-[#057DD1] relative inline-block"
                        animate={{
                            backgroundImage: [
                                "linear-gradient(90deg, transparent 0%, #00eaff 50%, transparent 100%)",
                            ],
                            backgroundSize: ["200% 100%"],
                            backgroundPosition: ["-200% 0%", "200% 0%"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Top-Up
                    </motion.span>
                    <motion.span
                        className="font-serif text-7xl max-lg:text-4xl text-[#ffb703] relative inline-block"
                        animate={{
                            backgroundImage: [
                                "linear-gradient(90deg, transparent 0%, #ffb703 50%, transparent 100%)",
                            ],
                            backgroundSize: ["200% 100%"],
                            backgroundPosition: ["-200% 0%", "200% 0%"],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Services
                    </motion.span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-lg max-lg:text-sm font-light text-white/80 mt-7"
                >
                    We offer a wide range of mobile network services, enabling users to
                    <br className="max-lg:hidden" /> recharge airtime and data across various
                    networks with ease.
                </motion.p>

                {/* Image with Floating Animation */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mt-10 flex gap-3"
                >
                    <motion.img
                        src={Users}
                        className="w-[300px] max-lg:w-[100px] cursor-pointer rounded-lg shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        alt="Laptop"
                    />
                    <GlowingButton />

                </motion.div>
            </div>
            <ScrollingLogos />
        </motion.section>
    );
};

export default HeroSection;
