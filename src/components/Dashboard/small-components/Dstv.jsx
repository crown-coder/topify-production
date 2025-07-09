import { useState, useEffect } from 'react';
import axios from 'axios';
import TvCard from './Cards/TvCard';

const Dstv = ({ onClick }) => {
    const [dstvPlans, setDstvPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDstvPlans = async () => {
            try {
                const response = await axios.get(`/api/cable-networks?withPlans=true`);
                const dstvData = response.data.find(network => network.name === "DSTV");

                if (dstvData && dstvData.plans) {
                    setDstvPlans(dstvData.plans);
                } else {
                    setError("No DSTV plans found");
                }
            } catch (error) {
                setError(error.message || "Failed to load DSTV plans");
            } finally {
                setLoading(false);
            }
        };

        fetchDstvPlans();
    }, []);

    if (loading) {
        return <div className="text-center py-4 text-sm text-gray-400 italic">Loading DSTV plans...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    if (dstvPlans.length === 0) {
        return <div className="text-center py-4">No DSTV plans available</div>;
    }

    return (
        <div className='grid grid-cols-5 gap-1'>
            {/* Empty div for layout */}
            <div></div>

            {/* First row */}
            <TvCard
                onClick={() => onClick(dstvPlans[0])}
                title={dstvPlans[0]?.package_name || "DSTV Smallie"}
                amount={`₦${dstvPlans[0]?.amount || "1,300"}`}
                duration={dstvPlans[0]?.validity || "Monthly"}
                className="bg-[#2EA2F5]"
            />
            <TvCard
                onClick={() => onClick(dstvPlans[1])}
                title={dstvPlans[1]?.package_name || "DSTV Jinja"}
                amount={`₦${dstvPlans[1]?.amount || "2,700"}`}
                duration={dstvPlans[1]?.validity || "Monthly"}
                className="col-span-2 bg-[#2EA2F5]"
            />
            <div></div>

            {/* Second row */}
            <TvCard
                onClick={() => onClick(dstvPlans[2])}
                title={dstvPlans[2]?.package_name || "DSTV Jinja"}
                amount={`₦${dstvPlans[2]?.amount || "3,500"}`}
                duration={dstvPlans[2]?.validity || "Monthly"}
                className="bg-[#2EA2F5]"
            />
            <TvCard
                onClick={() => onClick(dstvPlans[3])}
                title={dstvPlans[3]?.package_name || "DSTV Jinja"}
                amount={`₦${dstvPlans[3]?.amount || "4,500"}`}
                duration={dstvPlans[3]?.validity || "Monthly"}
                className="col-span-3 bg-[#006CB8]"
                txt="text-4xl max-lg:text-2xl"
            />

            {/* Third row */}
            <TvCard
                onClick={() => onClick(dstvPlans[4])}
                title={dstvPlans[4]?.package_name || "DSTV Jinja"}
                amount={`₦${dstvPlans[4]?.amount || "5,700"}`}
                duration={dstvPlans[4]?.validity || "3 Months"}
                className="bg-[#2EA2F5]"
            />
            <div></div>
            <div></div>

            {/* Fourth row */}
            <TvCard
                onClick={() => onClick(dstvPlans[5])}
                title={dstvPlans[5]?.package_name || "DSTV Jinja"}
                amount={`₦${dstvPlans[5]?.amount || "6,500"}`}
                duration={dstvPlans[5]?.validity || "Monthly"}
                className="col-span-2 bg-[#2EA2F5]"
            />
            <div></div>
        </div>
    );
};

export default Dstv;