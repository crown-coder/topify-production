import React from "react";
import { dataPlans } from "../../../constants/constants";
import MultiCard from "./Cards/MultiCard";
import PlainCard from "./Cards/PlainCard";
import AirSubCard from "./Cards/SubCard";

import { useModal } from '../../ModalContext';

const BuyDataCard = ({ activeButton, cardBgColor }) => {
    const plans = dataPlans[activeButton] || [];

    const { openModal, closeModal } = useModal()

    const handleBuyDataForm = () => {
        openModal(
            <AirSubCard />
        );
    }

    return (
        <div className="grid grid-cols-4 gap-1">
            {plans.map((plan, index) => {
                if (plan.type === "multi") {
                    return (
                        <MultiCard
                            key={index}
                            size={plan.size}
                            duration={plan.duration}
                            amount={plan.amount}
                            validity={plan.validity}
                            className={plan.className}
                            cardBgColor={cardBgColor}
                            handleBuyDataForm={handleBuyDataForm}
                        />
                    );
                } else if (plan.type === "plain") {
                    return (
                        <PlainCard
                            key={index}
                            size={plan.size}
                            duration={plan.duration}
                            amount={plan.amount}
                            validity={plan.validity}
                            className={plan.className}
                            cardBgColor={cardBgColor}
                            handleBuyDataForm={handleBuyDataForm}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default BuyDataCard;
