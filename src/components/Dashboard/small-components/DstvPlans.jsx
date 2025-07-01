import React, { useState, useEffect } from 'react'
import axios from 'axios'


const DstvPlans = ({ onClick }) => {
    const [dstvPlans, setDstvPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDstvPlans = async () => {
            try {
                const response = await axios.get('/api/cable-networks?withPlans=true')
                const dstvData = response.data.find(network => network.name === "DSTV")

                if (dstvData && dstvData.plans) {
                    setDstvPlans(dstvData.plans)
                } else {
                    setError("No DSTV plans found")
                }
            } catch (error) {
                setError(error.message || "Failed to load DSTV plans")
            } finally {
                setLoading(false)
            }
        }

        fetchDstvPlans()

    }, [])


    if (loading) {
        return <div className="text-center py-4 text-sm text-gray-400 italic">Loading DSTV plans...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>
    }

    if (dstvPlans.length === 0) {
        return <div className="text-center py-4">No DSTV plans available</div>
    }

    return (
        <div>
            <ul className='max-h-[400px] overflow-y-auto'>
                {dstvPlans.map((plan) => (
                    <li
                        onClick={() => onClick(plan)}
                        key={plan.id}
                        className="hover:bg-gray-100 text-gray-400 p-2 rounded-md flex justify-between w-full cursor-pointer border border-gray-200 mb-1"
                    >
                        <p className="mb-2 text-sm">{plan.package_name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DstvPlans
