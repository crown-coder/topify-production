import React, { useState } from "react";
import { motion } from "framer-motion";
import NineMobile from "../../assets/9mobile.png";
import Airtel from "../../assets/Airtel.png";
import Glo from "../../assets/Glo.png";
import MTN from "../../assets/MTN.png";
import Button from "../../components/Dashboard/small-components/Button";
import BuyDataCard from "./small-components/BuyDataCard";
import MoreDataCard from "./small-components/Cards/MoreDataCard";

import { useModal } from "../ModalContext";

const BuyData = () => {
    const [activeButton, setActiveButton] = useState("Daily"); // Determines content
    const [activeNetwork, setActiveNetwork] = useState("MTN"); // Determines card background color

    const { openModal, closeModal } = useModal();

    const modalContent = (() => {
        if (activeNetwork === "MTN") {
            return <MoreDataCard activeNetwork={activeNetwork} activeButton={activeButton} closeModal={closeModal} />;
        } else if (activeNetwork === "Airtel") {
            return <MoreDataCard activeNetwork={activeNetwork} activeButton={activeButton}  closeModal={closeModal} />;
        } else if (activeNetwork === "Glo") {
            return <MoreDataCard activeNetwork={activeNetwork} activeButton={activeButton}  closeModal={closeModal} />;
        } else if (activeNetwork === "9Mobile") {
            return <MoreDataCard activeNetwork={activeNetwork} activeButton={activeButton}  closeModal={closeModal} />;
        } else {
            return null;
        }
    })();

    const handleMoreData = () => {
        openModal(modalContent)
    }

    const networks = [
        { name: "MTN", image: MTN },
        { name: "Airtel", image: Airtel },
        { name: "Glo", image: Glo },
        { name: "9Mobile", image: NineMobile },
    ];

    const buttonOptions = [
        "Daily",
        "SME",
        "SME2",
        "Gifting",
        "Weekly",
        "Monthly",
        "Annually",
    ];

    // Get card background color based on active network
    const getNetworkColor = (network) => {
        switch (network) {
            case "MTN":
                return "bg-yellow-200";
            case "Airtel":
                return "bg-red-200";
            case "Glo":
                return "bg-green-200";
            case "9Mobile":
                return "bg-blue-200";
            default:
                return "bg-white";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-5 flex flex-col items-center gap-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl">
                <div className="overflow-hidden w-[350px]">
                    <div className="animate-scroll whitespace-nowrap">
                        <h1 className="flex gap-5 px-4 text-lg">
                            Code(s) for Data Balance
                            <span className="flex gap-5 font-semibold">
                                <span>SME*461*4#</span>
                                <span>Gifting*131*4#</span>
                                <span>Normal*312#</span>
                            </span>
                        </h1>
                    </div>
                </div>
                {/* Network Selection */}
                <div className="flex max-lg:flex-col lg:items-center gap-6">
                    <div className="flex max-lg:flex-col max-lg:items-center">
                        <div className="flex lg:flex-col gap-2">
                            {networks.map((network) => (
                                <button
                                    key={network.name}
                                    onClick={() => setActiveNetwork(network.name)}
                                    className={`py-2 rounded-full font-medium transition ${activeNetwork === network.name
                                        ? "scale-110"
                                        : ""
                                        }`}
                                >
                                    <img
                                        src={network.image}
                                        width={40}
                                        height={40}
                                        alt={network.name}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-[80%] flex flex-col items-center">
                        {/* Buttons that change content */}
                        <div className="flex lg:justify-between gap-2 overflow-x-scroll w-[350px] lg:w-full border mt-3 p-1 bg-[#F2F2F2] rounded-lg">
                            {buttonOptions.map((option) => (
                                <Button
                                    key={option}
                                    title={option}
                                    isActive={activeButton === option}
                                    onClick={() => setActiveButton(option)}
                                />
                            ))}
                        </div>

                        {/* Render BuyDataCard with activeNetwork's background */}
                        <div className="w-full mt-5">
                            <BuyDataCard
                                activeButton={activeButton}
                                cardBgColor={getNetworkColor(activeNetwork)}
                            />
                        </div>

                        <button className="w-[70%] my-4 py-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]" onClick={handleMoreData}>
                            More Data
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BuyData;
