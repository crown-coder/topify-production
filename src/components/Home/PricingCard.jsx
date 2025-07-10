import { useState } from 'react'
import PricingModal from './PricingModal'

const PricingCard = ({ icon, plans = [] }) => {
    const [showModal, setShowModal] = useState(false)

    const first8 = plans.slice(0, 8)
    const rest = plans.slice(8)

    return (
        <div className='rounded-xl flex flex-col items-center gap-4 py-10 bg-[#006CB8]'>
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
                    {first8.map((plan, i) => (
                        <tr key={i} className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                            <td className='py-1'>{plan.name || plan.package_name || 'N/A'}</td>
                            <td>{plan.size} {plan.volume}</td>
                            <td>₦{plan.amount}</td>
                            <td>{plan.validity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {rest.length > 0 && (
                <button
                    onClick={() => setShowModal(true)}
                    className='cursor-pointer bg-white text-[#006CB8] rounded-xl py-3 px-10 text-sm font-medium'
                >
                    View More
                </button>
            )}

            {showModal && (
                <PricingModal dataPlans={rest} onClose={() => setShowModal(false)} />
            )}
        </div>
    )
}

export default PricingCard
