import { useState } from "react"
import PricingModal from "./PricingModal"

const PricingCard = ({ icon, networkCode }) => {
    const [showPricingModal, setShowPricingModal] = useState(false)
    const [dataPlans, setDataPlans] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleMore = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('https://app.topify.ng/api/data-plans?key=dataplan6b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q')
            const data = await response.json()

            // Filter plans by network code
            const filteredPlans = []
            data.mobile_networks.forEach(network => {
                if (network.code === networkCode) {
                    network.plan_types.forEach(planType => {
                        if (planType.data_plans && planType.data_plans.length > 0) {
                            filteredPlans.push(...planType.data_plans)
                        }
                    })
                }
            })

            setDataPlans(filteredPlans)
            setShowPricingModal(true)
        } catch (error) {
            console.error('Error fetching data plans:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Sample data to display in the card (first 4 plans)
    const samplePlans = [
        { name: "Basic", size: "5", volume: "GB", amount: "19.99", validity: "1 Year" },
        { name: "Plus", size: "10", volume: "GB", amount: "29.99", validity: "1 Year" },
        { name: "Premium", size: "20", volume: "GB", amount: "49.99", validity: "1 Year" },
        { name: "Ultimate", size: "50", volume: "GB", amount: "99.99", validity: "1 Year" },
        { name: "Premium", size: "20", volume: "GB", amount: "49.99", validity: "1 Year" },
        { name: "Ultimate", size: "50", volume: "GB", amount: "99.99", validity: "1 Year" },
        { name: "Premium", size: "20", volume: "GB", amount: "49.99", validity: "1 Year" },
        { name: "Ultimate", size: "50", volume: "GB", amount: "99.99", validity: "1 Year" }
    ]

    return (
        <div className='rounded-xl flex flex-col items-center gap-4 py-10 bg-[#006CB8] z-20'>
            <img src={icon} className='w-[60px] h-[60px]' alt="Network logo" />
            <table className='w-full'>
                <thead>
                    <tr className='bg-[#006CB8] text-white'>
                        <th className='py-3 px-2 text-sm font-semibold'>Data Type</th>
                        <th className='px-2 text-sm font-semibold'>Size</th>
                        <th className='px-2 text-sm font-semibold'>Price</th>
                        <th className='px-2 text-sm font-semibold'>Validity</th>
                    </tr>
                </thead>
                <tbody>
                    {samplePlans.map((plan, index) => (
                        <tr
                            key={index}
                            className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'
                        >
                            <td className='py-1'>{plan.name}</td>
                            <td>{plan.size} {plan.volume}</td>
                            <td>₦{plan.amount}</td>
                            <td>{plan.validity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={handleMore}
                className='cursor-pointer bg-white text-[#006CB8] rounded-xl py-3 px-10 text-sm font-medium'
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'View More'}
            </button>

            {showPricingModal && (
                <PricingModal
                    dataPlans={dataPlans}
                    onClose={() => setShowPricingModal(false)}
                />
            )}
        </div>
    )
}

export default PricingCard