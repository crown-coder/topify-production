import React from 'react'
import MethodCard from './MethodCard'
import Method1 from '../../../assets/method1.png';
import Method2 from '../../../assets/method2.png';
import Method3 from '../../../assets/method3.png';
import Method4 from '../../../assets/method4.png';

const Methods = () => {
    return (
        <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className=' w-full flex justify-between items-center'>
                <h2 className='text-xl text-gray-900'>Other Methods</h2>
            </div>
            <div className='mt-4 grid grid-cols-2 gap-3'>
                <MethodCard className="bg-[#2CA0F2] text-white" title="Fund with card" imageUrl={Method1} />
                <MethodCard className="bg-[#C2D9EA] text-[#006CB8]" title="Fund with manual transfer" imageUrl={Method2} />
                <MethodCard className="bg-[#C2D9EA] text-[#006CB8]" title="Fund with USSD" imageUrl={Method3} />
                <MethodCard title="Fund with voucher" className="bg-[#2CA0F2] text-white" imageUrl={Method4} />
            </div>
        </div>
    )
}

export default Methods
