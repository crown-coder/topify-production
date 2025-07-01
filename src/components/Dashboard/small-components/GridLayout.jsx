import { useState } from "react";
import { motion } from "framer-motion";
import AirSubCard from "./Cards/SubCard";
import { useModal } from "../../ModalContext";

const Card = ({ value, bgColor, scatter, scatterVariants, onClick, isActive, activeCardStyle }) => {
    return (
        <motion.div
            className={`cursor-pointer text-center font-bold p-11 rounded-lg ${bgColor} ${isActive ? activeCardStyle : ""} flex items-center justify-center`}
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

const GridLayout = ({ className, scatter, activeNetwork, activeCardStyle }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [activeCard, setActiveCard] = useState(null);
    const { openModal, closeModal } = useModal();

    const handleBuyAirtime = (e) => {
        e.preventDefault();
        if (!selectedValue) return;

        const plan = {
            amount: selectedValue,
            provider: activeNetwork
        };

        openModal(<AirSubCard plan={plan} provider={activeNetwork} closeModal={closeModal} />);
    };

    const scatterVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
        },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
        },
    };

    const handleCardClick = (value, index) => {
        const numericValue = value.replace("N", "");
        setSelectedValue(numericValue);
        setActiveCard(index);
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setSelectedValue(value);
        setActiveCard(null);
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
                    activeCardStyle={activeCardStyle}
                />
                <Card
                    value="N400"
                    bgColor={`${className} h-[80px] col-span-2 text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N400", 1)}
                    isActive={activeCard === 1}
                    activeCardStyle={activeCardStyle}
                />
                <div></div>
                <Card
                    value="N100"
                    bgColor={`${className} h-[120px] text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N100", 2)}
                    isActive={activeCard === 2}
                    activeCardStyle={activeCardStyle}
                />
                <Card
                    value="N1000"
                    bgColor={`${className} col-span-3 h-[120px] text-3xl`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N1000", 3)}
                    isActive={activeCard === 3}
                    activeCardStyle={activeCardStyle}
                />
                <Card
                    value="N300"
                    bgColor={`${className} h-[120px] text-lg`}
                    scatter={scatter}
                    scatterVariants={scatterVariants}
                    onClick={() => handleCardClick("N300", 4)}
                    isActive={activeCard === 4}
                    activeCardStyle={activeCardStyle}
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
                    activeCardStyle={activeCardStyle}
                />
                <div></div>
            </div>
            <div className="w-[50%] max-lg:w-[90%]">
                <form onSubmit={handleBuyAirtime}>
                    <input
                        type="text"
                        placeholder="Enter amount"
                        className="p-3 border rounded-lg w-full"
                        value={selectedValue ? `N${selectedValue}` : ""}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        className="w-full my-4 py-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]"
                        type="submit"
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GridLayout;