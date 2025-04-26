import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TvCard from './Cards/TvCard'
const Startimes = ({ onClick }) => {
    const [startimesPlans, setStartimesPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStartimesPlans = async () => {
            try {
                const response = await axios.get('/api/cable-networks?withPlans=true')
                const startimesData = response.data.find(network => network.name === "STARTIME")

                if (startimesData && startimesData.plans) {
                    setStartimesPlans(startimesData.plans)
                } else {
                    setError("No Startimes plans found")
                }
            } catch (error) {
                setError(error.message || "Failed to load Startimes plans")
            } finally {
                setLoading(false)
            }
        }

        fetchStartimesPlans()

    }, [])

    if (loading) {
        return <div className="text-center py-4 text-sm text-gray-400 italic">Loading Startimes plans...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>
    }

    if (startimesPlans.length === 0) {
        return <div className="text-center py-4">No Startimes plans available</div>
    }

    return (
        <div className='grid grid-cols-5 gap-1'>
            <div></div>
            <TvCard
                onClick={() => onClick(startimesPlans[0])}
                title={startimesPlans[0]?.package_name || "DSTV Smallie"}
                amount={`₦${startimesPlans[0]?.amount || "1,300"}`}
                duration={startimesPlans[0]?.validity || "Monthly"}
                className="bg-orange-400"
            />
            <TvCard
                onClick={() => onClick(startimesPlans[1])}
                title={startimesPlans[1]?.package_name || "DSTV Jinja"}
                amount={`₦${startimesPlans[1]?.amount || "2,700"}`}
                duration={startimesPlans[1]?.validity || "Monthly"}
                className="col-span-2 bg-orange-400"
            />
            <div></div>
            <TvCard
                onClick={() => onClick(startimesPlans[2])}
                title={startimesPlans[2]?.package_name || "DSTV Jinja"}
                amount={`₦${startimesPlans[2]?.amount || "3,500"}`}
                duration={startimesPlans[2]?.validity || "Monthly"}
                className="bg-orange-400"
            />
            <TvCard
                onClick={() => onClick(startimesPlans[3])}
                title={startimesPlans[3]?.package_name || "DSTV Jinja"}
                amount={`₦${startimesPlans[3]?.amount || "4,500"}`}
                duration={startimesPlans[3]?.validity || "Monthly"}
                className="col-span-3 bg-orange-600"
                txt="text-4xl max-lg:text-2xl"
            />
            <TvCard
                onClick={() => onClick(startimesPlans[4])}
                title={startimesPlans[4]?.package_name || "DSTV Jinja"}
                amount={`₦${startimesPlans[4]?.amount || "5,700"}`}
                duration={startimesPlans[4]?.validity || "3 Months"}
                className="bg-orange-400"
            />
            <div></div>
            <div></div>
            <TvCard
                onClick={() => onClick(startimesPlans[5])}
                title={startimesPlans[5]?.package_name || "DSTV Jinja"}
                amount={`₦${startimesPlans[5]?.amount || "6,500"}`}
                duration={startimesPlans[5]?.validity || "Monthly"}
                className="col-span-2 bg-orange-400"
            />
            <div></div>
        </div>
    )
}

export default Startimes
