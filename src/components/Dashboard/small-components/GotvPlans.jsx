import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { IoRefresh } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';

const fetchGotvPlans = async () => {
    const res = await axios.get('/api/cable-networks?withPlans=true');
    const gotvData = res.data.find(network => network.name === "GOTV");

    if (!gotvData || !gotvData.plans) {
        throw new Error("No GOTV plans found");
    }

    return gotvData.plans;
};

const GotvPlans = ({ onClick }) => {
    const {
        data: gotvPlans = [],
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['gotvPlans'],
        queryFn: fetchGotvPlans,
        staleTime: 1000 * 60 * 10, // 10 min
        refetchOnWindowFocus: false,
    });

    return (
        <div className="p-3 border rounded-md bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">GOTV Plans</h2>
                <button
                    className={`text-xl hover:opacity-80 transition-all ${isFetching ? 'animate-spin text-blue-500' : 'text-gray-600'
                        }`}
                    onClick={() => refetch()}
                    disabled={isFetching}
                >
                    <IoRefresh />
                </button>
            </div>

            {isLoading ? (
                <div className="flex flex-col gap-3">
                    {Array(6).fill().map((_, i) => (
                        <Skeleton key={i} height={40} />
                    ))}
                </div>
            ) : isError ? (
                <p className="text-red-500 text-center">{error.message}</p>
            ) : gotvPlans.length === 0 ? (
                <p className="text-center py-4">No GOTV plans available</p>
            ) : (
                <ul className="max-h-[400px] overflow-y-auto">
                    {gotvPlans.map((plan) => (
                        <li
                            onClick={() => onClick(plan)}
                            key={plan.id}
                            className="hover:bg-gray-100 text-gray-600 p-2 rounded-md flex justify-between w-full cursor-pointer border border-gray-200 mb-1 dark:text-gray-300 dark:border-gray-700"
                        >
                            <p className="text-sm">{plan.package_name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GotvPlans;
