import { useEffect, useState } from "react";
import axios from "axios";
import MultiCard from "./Cards/MultiCard";
import PlainCard from "./Cards/PlainCard";
import AirSubCard from "./Cards/SubCard";
import { useModal } from "../../ModalContext";

const BuyDataCard = ({ activeButton, activeNetwork, cardBgColor }) => {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const { openModal } = useModal();

    // Map mobile_network_id to network name
    const networkInfo = {
        1: { name: "MTN" },
        2: { name: "AIRTEL" },
        3: { name: "GLO" },
        4: { name: "9MOBILE" },
    };

    useEffect(() => {
        const fetchDataList = async () => {
            try {
                const response = await axios.get("/api/data-plans");
                setDataList(response.data?.mobile_networks || []);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching data plans");
                console.error("Data plans error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDataList();
    }, []);

    // Find the network by mobile_network_id (1-4)
    const currentNetwork = dataList.find((network) =>
        networkInfo[network.id]?.name === activeNetwork?.toUpperCase()
    );

    // Get all data plans for the active network, sorted by plan type
    const networkPlans = currentNetwork?.plan_types
        ?.flatMap((planType) =>
            planType.data_plans.map((plan) => ({
                ...plan,
                planTypeName: planType.name,
                key: `${currentNetwork.id}-${planType.id}-${plan.id}` // Create unique key
            }))
        ) || [];

    const handleBuyDataForm = (plan) => {
        openModal(<AirSubCard plan={plan} activeNetwork={activeNetwork} />);
    };

    const plansToRender = showAll ? networkPlans : networkPlans.slice(0, 8);

    // Visual span logic for Bento layout
    const getCardSpanClass = (index) => {
        const pattern = [
            "",               // 0: normal
            "col-span-2",     // 1: wider
            "",               // 2: normal
            "row-span-2",     // 3: taller
            "",               // 4: normal
            "col-span-2",     // 5: wider
            "",               // 6: normal
            "",               // 7: normal
            "row-span-2",     // 8: taller
            "",               // 9: normal
            "",               // 10: normal
            "col-span-2",     // 11: wider
        ];
        return pattern[index % pattern.length];
    };

    if (loading) return <p>Loading data plans...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (networkPlans.length === 0) return <p>No data plans found for {activeNetwork}</p>;

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

            {/* {networkPlans.length > 12 && (
                <button
                    className="self-center mt-4 text-blue-600 underline"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Show Less" : "Show More Data Plans"}
                </button>
            )} */}
        </div>
    );
};

export default BuyDataCard;