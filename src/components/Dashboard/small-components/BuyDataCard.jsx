import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MultiCard from "./Cards/MultiCard";
import PlainCard from "./Cards/PlainCard";
import AirSubCard from "./Cards/SubCard";
import { useModal } from "../../ModalContext";

const fetchDataPlans = async () => {
    const response = await axios.get("/api/data-plans");
    return response.data?.mobile_networks || [];
};

const BuyDataCard = ({ activeButton, activeNetwork, cardBgColor }) => {
    const { openModal } = useModal();
    const [showAll, setShowAll] = useState(false);

    const {
        data: dataList = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["data-plans"],
        queryFn: fetchDataPlans,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    const networkInfo = {
        1: { name: "MTN" },
        2: { name: "AIRTEL" },
        3: { name: "GLO" },
        4: { name: "9MOBILE" },
    };

    const currentNetwork = dataList.find(
        (network) =>
            networkInfo[network.id]?.name === activeNetwork?.toUpperCase()
    );

    const networkPlans =
        currentNetwork?.plan_types?.flatMap((planType) =>
            planType.data_plans.map((plan) => ({
                ...plan,
                planTypeName: planType.name,
                key: `${currentNetwork.id}-${planType.id}-${plan.id}`,
            }))
        ) || [];

    const handleBuyDataForm = (plan) => {
        openModal(<AirSubCard plan={plan} activeNetwork={activeNetwork} />);
    };

    const plansToRender = showAll ? networkPlans : networkPlans.slice(0, 8);

    const getCardSpanClass = (index) => {
        const pattern = [
            "", "col-span-2", "", "row-span-2", "", "col-span-2",
            "", "", "row-span-2", "", "", "col-span-2",
        ];
        return pattern[index % pattern.length];
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-4 auto-rows-[140px] gap-2">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white dark:bg-gray-700 shadow-sm">
                        <Skeleton height={20} width={80} />
                        <Skeleton height={15} width={100} className="mt-2" />
                        <Skeleton height={20} width={60} className="mt-2" />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500">{error.message}</p>;
    }

    if (networkPlans.length === 0) {
        return <p>No data plans found for {activeNetwork}</p>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 auto-rows-[140px] gap-2">
                {plansToRender.map((plan, index) => {
                    const spanClass = getCardSpanClass(index);
                    const commonProps = {
                        key: plan.key,
                        size: `${plan.size} ${plan.volume}`,
                        duration: plan.validity,
                        amount: plan.amount,
                        validity: plan.validity,
                        className: spanClass,
                        cardBgColor: cardBgColor,
                        handleBuyDataForm: () => handleBuyDataForm(plan),
                    };

                    return plan.size >= 10 ? (
                        <MultiCard {...commonProps} />
                    ) : (
                        <PlainCard {...commonProps} />
                    );
                })}
            </div>
        </div>
    );
};

export default BuyDataCard;
