import React from 'react'

const PricingCard = ({ icon }) => {
    return (
        <div className='rounded-xl flex flex-col items-center gap-4 py-10 bg-[#006CB8] z-20'>
            <img src={icon} className='w-[60px] h-[60px]' />
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='text-white py-3 px-2 text-sm font-semibold'>Data Type</th>
                        <th className='text-white px-2 text-sm font-semibold'>Size</th>
                        <th className='text-white px-2 text-sm font-semibold'>Price</th>
                        <th className='text-white px-2 text-sm font-semibold'>Validity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Basic</td>
                        <td>5 GB</td>
                        <td>$19.99</td>
                        <td>1 Year</td>
                    </tr>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Plus</td>
                        <td>10 GB</td>
                        <td>$29.99</td>
                        <td>1 Year</td>
                    </tr>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Basic</td>
                        <td>5 GB</td>
                        <td>$19.99</td>
                        <td>1 Year</td>
                    </tr>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Plus</td>
                        <td>10 GB</td>
                        <td>$29.99</td>
                        <td>1 Year</td>
                    </tr>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Basic</td>
                        <td>5 GB</td>
                        <td>$19.99</td>
                        <td>1 Year</td>
                    </tr>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Plus</td>
                        <td>10 GB</td>
                        <td>$29.99</td>
                        <td>1 Year</td>
                    </tr>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Basic</td>
                        <td>5 GB</td>
                        <td>$19.99</td>
                        <td>1 Year</td>
                    </tr>
                    <tr className='text-center text-sm text-[#006CB8] bg-white border-b-8 border-[#006CB8]'>
                        <td className='py-1'>Plus</td>
                        <td>10 GB</td>
                        <td>$29.99</td>
                        <td>1 Year</td>
                    </tr>

                </tbody>
            </table>
            <button className='cursor-pointer bg-white text-[#006CB8] rounded-xl py-3 px-10 text-sm font-medium'>View More</button>
        </div>
    )
}

export default PricingCard
