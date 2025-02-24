import React from 'react'
import ToggleSwitch from '../../../ToggleSwitch'

const AdvanceConfig = () => {
    return (
        <div className='w-full my-2 rounded-xl bg-white p-3'>
            <div className='grid grid-cols-2 gap-7'>
                <ToggleSwitch text="KYS BVN" />
                <ToggleSwitch text="KYS NIN" />
                <ToggleSwitch text="Enable Add API" />
                <ToggleSwitch text="Enable Referral" />
                <ToggleSwitch text="Enable Wallet Transfer" />
                <div></div>
                {/* Buttons */}
                <div className='flex flex-col gap-1'>
                    <button className='w-full py-3 rounded-lg border text-[#434343] font-bold cursor-pointer'>Back</button>
                </div>
                <div className='flex flex-col gap-1'>
                    <button type="submit" className='w-full py-3 rounded-lg border border-[#4CACF0] bg-[#4CACF0] hover:bg-[#39a2ed] transition-all duration-75 text-[#FFFFFF] font-bold cursor-pointer'>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default AdvanceConfig
