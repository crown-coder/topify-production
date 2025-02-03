import React from 'react'
import MTN from '../../../../assets/mtn.png'
import Airtel from '../../../../assets/Airtel.png'
import Glo from '../../../../assets/Glo.png'
import NineMobile from '../../../../assets/9mobile.png'
import { dataPlans } from '../../../../constants/constants'

import { MdCancel } from "react-icons/md";
const MoreDataCard = ({ activeNetwork, closeModal, activeButton }) => {

    let ImageUrl;

    if (activeNetwork === "MTN") {
        ImageUrl = MTN
    } else if (activeNetwork === "Airtel") {
        ImageUrl = Airtel
    } else if (activeNetwork === "Glo") {
        ImageUrl = Glo
    } else if (activeNetwork === "9Mobile") {
        ImageUrl = NineMobile
    } else {
        return null;
    }

    // Fetching data plans for the selected network
    const plans = dataPlans[activeButton] || [];

    // Rendering data plans
    const dataList = plans.map((plan, index) => (
        <li key={index} className='p-3 text-sm rounded-md border border-[#D9D9D9] text-[#989898] cursor-pointer hover:shadow-md transition-all duration-100'>
            {plan.size} {activeButton} = {plan.amount} {plan.validity} days
        </li>
    ));

    return (
        <div className='w-[500px] p-4 rounded-lg bg-white'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <img src={ImageUrl} className='w-[50px] h-[50px]' />
                    <h2 className='text-xl'>More Data</h2>
                </div>
                <button
                    onClick={closeModal}
                    className="text-xl"
                >
                    <MdCancel />
                </button>
            </div>

            {/* data List */}
            <ul className='mt-4 flex flex-col gap-2 max-h-[400px] overflow-y-scroll '>
                {dataList}
            </ul>
        </div>
    )
}

export default MoreDataCard
