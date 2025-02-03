import React, { useState } from "react";
import { motion } from "framer-motion";
import AirSubCard from "./Cards/SubCard";

import { useModal } from "../../ModalContext";

const Card = ({ value, bgColor, scatter, scatterVariants, onClick, isActive, handleBuyAiretime }) => {
    return (
        <motion.div
            className={`cursor-pointer text-center font-bold p-11 rounded-lg ${bgColor} ${isActive ? "activeCard" : ""
                } flex items-center justify-center`}
            variants={scatterVariants}
            initial={scatter ? "hidden" : "visible"}
            animate={scatter ? "hidden" : "visible"}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={onClick}
        >
            {value}
        </motion.div>
    );
};

const GridLayout = ({ className, scatter }) => {
    const [selectedValue, setSelectedValue] = useState(""); // Track selected card value
    const [activeCard, setActiveCard] = useState(null); // Track the active card

    const { openModal } = useModal();

    const handleBuyAirtime = (e) => {
        e.preventDefault();

        openModal(
            <AirSubCard />
        )
    }

    // Scatter animation variants
    const scatterVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            x: Math.random() * 400 - 200, // Random scatter x-axis
            y: Math.random() * 400 - 200, // Random scatter y-axis
        },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
        },
    };

    // Handle card click
    const handleCardClick = (value, index) => {
        const numericValue = parseInt(value.replace("N", ""), 10); // Convert to number
        setSelectedValue(numericValue);
        setActiveCard(index); // Set the active card index
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Allow only numeric input
        setSelectedValue(value);
        setActiveCard(null); // Remove active card if input is manually changed
    };

    return (
        <div className="w-[100%] max-lg:w-full max-lg:my-5 mr-8 max-lg:mr-0 flex flex-col items-center">
            <div className="grid grid-cols-5 gap-1 items-end p-4">
                <div></div>
                <Card
                    value="N500"
                    bgColor={`${className} h-[100px] text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N500", 0)}
                    isActive={activeCard === 0}
                />
                <Card
                    value="N400"
                    bgColor={`${className} h-[80px] col-span-2 text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N400", 1)}
                    isActive={activeCard === 1}
                />
                <div></div>
                <Card
                    value="N100"
                    bgColor={`${className} h-[120px] text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N100", 2)}
                    isActive={activeCard === 2}
                />
                <Card
                    value="N1000"
                    bgColor={`${className} col-span-3 h-[120px] text-3xl`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N1000", 3)}
                    isActive={activeCard === 3}
                />
                <Card
                    value="N300"
                    bgColor={`${className} h-[120px] text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N300", 4)}
                    isActive={activeCard === 4}
                />
                <div></div>
                <div></div>
                <Card
                    value="N200"
                    bgColor={`${className} col-span-2 text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N200", 5)}
                    isActive={activeCard === 5}
                />
                <div></div>
            </div>
            <div className="w-[50%] max-lg:w-[90%]">
                <form>
                    <input
                        type="text"
                        placeholder="Enter amount"
                        className="p-3 border rounded-lg w-full"
                        value={selectedValue} // Allow value to be typed or selected
                        onChange={handleInputChange} // Handle manual input
                        required
                    />
                    <button className="w-full my-4 py-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]" type="submit" onClick={handleBuyAirtime}>
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GridLayout;
