import React, { useState } from "react";
import GridLayout from "./small-components/GridLayout";
import NineMobile from "../../assets/9mobile.png";
import Airtel from "../../assets/Airtel.png";
import Glo from "../../assets/Glo.png";
import MTN from "../../assets/MTN.png";
import { motion } from "framer-motion";

const BuyAirtime = () => {
    const [activeButton, setActiveButton] = useState("MTN");
    const [scatter, setScatter] = useState(false);

    const handleButtonClick = (network) => {
        setScatter(true); // Trigger scatter animation
        setTimeout(() => {
            setActiveButton(network); // Update the active button after the animation
            setScatter(false); // Reset scatter animation state
        }, 400); // Duration of scatter animation
    };

    const networks = [
        { name: "MTN", image: MTN, style: "bg-[#FFE89C] p-8 max-lg:px-2 hover:bg-[#FFD325] text-black", activeCard: "bg-[#FFC325] text-white" },
        { name: "Airtel", image: Airtel, style: "bg-red-200 p-8 max-lg:px-2  hover:bg-[#E20010] text-black", activeCard: "bg-[#E20010] text-white" },
        { name: "Glo", image: Glo, style: "bg-green-300 p-8 max-lg:px-2  hover:bg-green-500 text-black", activeCard: "bg-green-500 text-white" },
        { name: "9Mobile", image: NineMobile, style: "bg-green-100 p-8 max-lg:px-2  hover:bg-green-800 text-green-800 hover:text-white", activeCard: "bg-green-800 text-white" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex max-lg:flex-col items-center justify-between p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl">
                {/* Network Buttons */}
                <div className="flex lg:flex-col gap-2 max-lg:gap-1">
                    {networks.map((network) => (
                        <button
                            key={network.name}
                            onClick={() => handleButtonClick(network.name)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${activeButton === network.name ? "scale-150" : ""
                                }`}
                        >
                            <img
                                src={network.image}
                                width={35}
                                height={35}
                                alt={network.name}
                                className={`transition ${activeButton === network.name
                                    ? "border border-blue-500 rounded-full"
                                    : ""
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <GridLayout
                    className={`flex-1 p-4 rounded-md ${networks.find((network) => network.name === activeButton)?.style
                        }`}
                    scatter={scatter}
                    // networks={networks}
                />
            </div>
        </motion.div>
    );
};

export default BuyAirtime;
