import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { MdOutlineDownload } from "react-icons/md";

const GlowingButton = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - left - width / 2,
            y: e.clientY - top - height / 2,
        });
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onMouseMove={handleMouseMove}
            className="relative flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium text-lg overflow-hidden bg-[#057DD1] shadow-lg"
        >
            {/* Dynamic Glow Following the Cursor */}
            <motion.span
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[#057DD1] blur-xl opacity-60 rounded-full w-40 h-40"
            ></motion.span>

            <span className="relative">Download Now</span>
            <MdOutlineDownload size={25} className="relative" />
        </motion.button>
    );
};

export default GlowingButton;
