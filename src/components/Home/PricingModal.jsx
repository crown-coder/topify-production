const PricingModal = ({ dataPlans, onClose }) => {
    return (
        <div className='fixed inset-0 w-full h-dvh bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-bold text-[#006CB8]'>All Data Plans</h2>
                    <button
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700'
                    >
                        ✕
                    </button>
                </div>

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
                        {dataPlans.map((plan, index) => (
                            <tr
                                key={index}
                                className={`text-center text-sm text-[#006CB8] ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <td className='py-3'>{plan.name || plan.package_name || 'N/A'}</td>
                                <td>{plan.size} {plan.volume}</td>
                                <td>₦{plan.amount}</td>
                                <td>{plan.validity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PricingModal