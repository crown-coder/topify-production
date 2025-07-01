import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const WhyChooseUs = () => {
    const cards = [
        {
            title: "Quick Delivery",
            description: "Experience effortless airtime and data top-ups with Smart Data Links. Enjoy fast, reliable delivery whenever you need it! Convenience and speed, right at your fingertips.",
        },
        {
            title: "We are Reliable",
            description: "Smart Data Links delivers 100% value for every transaction. Count on us for a platform that’s trusted, dependable, and always optimized for your needs.",
        },
        {
            title: "Concrete Security",
            description: "Your funds are protected by your e-wallet PIN and securely stored for as long as you choose. Enjoy the freedom to withdraw anytime you need.",
        },
    ];

    return (
        <section className="w-full py-20 px-10 flex justify-between bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
            {/* Glowing Title */}
            <div>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-bold relative mb-12 font-serif"
                >
                    Why <span className="text-[#057DD1]">Choose</span> Us?
                    <motion.span
                        className="absolute -bottom-2 left-1/2 w-20 h-1 bg-[#057DD1] blur-lg"
                        animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.span>
                </motion.h2>

                <p className="text-sm md:text-base text-gray-400">
                    We're committed to providing you with the best possible<br />experience, making it easy to enjoy your favorite TV<br /> channels and data services.
                </p>

            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-2 gap-3">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative p-6 w-80 md:w-96 rounded-xl backdrop-blur-lg bg-white/0 hover:bg-white/5 border border-white/20 shadow-lg flex flex-col items-center text-center"
                    >
                        <FaCheckCircle size={40} className="text-[#057DD1] mb-4" />
                        <h3 className="text-xl font-semibold">{card.title}</h3>
                        <p className="text-gray-300 mt-3">{card.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
