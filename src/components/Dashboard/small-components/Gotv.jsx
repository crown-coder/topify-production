import { useState, useEffect } from 'react';
import axios from 'axios';
import TvCard from './Cards/TvCard';

const Gotv = ({ onClick }) => {
    const [gotvPlans, setGotvPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGotvPlans = async () => {
            try {
                const response = await axios.get(`/api/cable-networks?withPlans=true`);
                const gotvData = response.data.find(network => network.name === "GOTV");

                if (gotvData && gotvData.plans) {
                    setGotvPlans(gotvData.plans);
                } else {
                    setError("No GOTV plans found");
                }
            } catch (error) {
                setError(error.message || "Failed to load GOTV plans");
            } finally {
                setLoading(false);
            }
        };

        fetchGotvPlans();
    }, []);

    if (loading) {
        return <div className="text-center py-4 text-sm text-gray-400 italic">Loading GOTV plans...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    if (gotvPlans.length === 0) {
        return <div className="text-center py-4">No GOTV plans available</div>;
    }

    return (
        <div className='grid grid-cols-5 gap-1'>
            {/* Empty div for layout */}
            <div></div>

            {/* First row */}
            <TvCard
                onClick={() => onClick(gotvPlans[0])}
                title={gotvPlans[0]?.package_name || "GOtv Smallie"}
                amount={`₦${gotvPlans[0]?.amount || "1,300"}`}
                duration={gotvPlans[0]?.validity || "Monthly"}
                className="bg-green-500"
            />
            <TvCard
                onClick={() => onClick(gotvPlans[1])}
                title={gotvPlans[1]?.package_name || "GOtv Jinja"}
                amount={`₦${gotvPlans[1]?.amount || "2,700"}`}
                duration={gotvPlans[1]?.validity || "Monthly"}
                className="col-span-2 bg-green-500"
            />
            <div></div>

            {/* Second row */}
            <TvCard
                onClick={() => onClick(gotvPlans[0])}
                title={gotvPlans[0]?.package_name || "GOtv Smallie"}
                amount={`₦${gotvPlans[0]?.amount || "1,300"}`}
                duration={gotvPlans[0]?.validity || "Monthly"}
                className="bg-green-500"
            />
            <TvCard
                onClick={() => onClick(gotvPlans[4])}
                title={gotvPlans[4]?.package_name || "GOtv Max"}
                amount={`₦${gotvPlans[4]?.amount || "5,700"}`}
                duration={gotvPlans[4]?.validity || "3 Months"}
                className="col-span-3 bg-green-800"
                txt="text-4xl max-lg:text-2xl"
            />

            {/* Third row */}
            <TvCard
                onClick={() => onClick(gotvPlans[6])}
                title={gotvPlans[6]?.package_name || "GOtv Smallie"}
                amount={`₦${gotvPlans[6]?.amount || "3,750"}`}
                duration={gotvPlans[6]?.validity || "Quarterly"}
                className="bg-green-500"
            />
            <div></div>
            <div></div>

            {/* Fourth row */}
            <TvCard
                onClick={() => onClick(gotvPlans[3])}
                title={gotvPlans[3]?.package_name || "GOtv Jolli"}
                amount={`₦${gotvPlans[3]?.amount || "3,950"}`}
                duration={gotvPlans[3]?.validity || "Monthly"}
                className="col-span-2 bg-green-500"
            />
            <div></div>
        </div>
    );
};

export default Gotv;