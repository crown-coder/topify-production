import React, { useState, useEffect } from 'react'
import axios from 'axios'

const StartimesPlans = ({ onClick }) => {
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
        <div>
            <ul className='max-h-[400px] overflow-y-auto'>
                {startimesPlans.map((plan) => (
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

export default StartimesPlans
