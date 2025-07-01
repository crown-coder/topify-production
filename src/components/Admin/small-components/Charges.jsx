import React from 'react'
import DiscountCard from './DiscountCard'
import GOTV from '../../../assets/gotv.png'
import DSTV from '../../../assets/dstv.png'
import STARTIMES from '../../../assets/startimes.png'

const Charges = () => {
    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <h2 className='text-[#434343] text-2xl mb-3'>Cable Tv Subscription</h2>
            <div className='w-full grid grid-cols-2 gap-6'>
                {/* Cards */}
                <DiscountCard title="GOTV" ImageUrl={GOTV} />
                <DiscountCard title="DSTV" ImageUrl={DSTV} />
                <DiscountCard title="STARTIMES" ImageUrl={STARTIMES} className="my-4" />
            </div>
        </div>
    )
}

export default Charges
