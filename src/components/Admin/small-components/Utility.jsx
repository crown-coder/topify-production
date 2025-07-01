import React from 'react'
import UtilityCard from './UtilityCard';
import { LuGraduationCap } from "react-icons/lu";
import { LuSquarePlay } from "react-icons/lu";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { SlWallet } from "react-icons/sl";
const Utility = () => {
    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <h2 className='text-[#434343] text-2xl mb-3'>Utility and other Services</h2>
            <div className='w-full grid grid-cols-2 gap-6'>
                {/* Cards */}
                <UtilityCard title="Cable TV Subscription" icon={<LuSquarePlay />} />
                <UtilityCard title="Result Checker" icon={<LuGraduationCap />} />
                <UtilityCard title="Electricity Bill Payment" icon={<AiOutlineThunderbolt />} />
                <UtilityCard title="Wallet Funding" icon={<GiWallet />} />
                <UtilityCard title="User Spending Limit" icon={<SlWallet />} />
            </div>
        </div>
    )
}

export default Utility
