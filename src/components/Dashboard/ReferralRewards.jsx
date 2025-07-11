import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import RefferalTable from './small-components/RefferalTable';
import { IoCopy } from "react-icons/io5";

const ReferralRewards = () => {
    const [totalReferral, setTotalReferral] = useState(0)
    const [totalBonus, setTotalBonus] = useState(0)

    const fetchReferralData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/referrals`)
            const data = response.data
            setTotalReferral(data.length)

            const bonusSum = data.reduce((sum, referral) => {
                return sum + parseFloat(referral.bonus_earn || 0)
            }, 0)
            setTotalBonus(bonusSum.toFixed(2)) // Keep 2 decimal places
        } catch (error) {
            console.error('Error fetching referral data:', error)
        }
    }

    useEffect(() => {
        fetchReferralData()
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-full mt-2'>
                <div className='w-full p-4 flex max-lg:flex-col max-lg:gap-2 lg:justify-between bg-white rounded-lg'>
                    <div>
                        <h2 className='font-semibold mb-1'>Invite new users to earn</h2>
                        <p className='flex items-center gap-2 font-light'>Referral code: <span className='flex items-center gap-2 font-semibold text-[#175682]'>8111123445 <IoCopy className='cursor-pointer' /> </span></p>
                    </div>
                    <div className='text-center max-lg:text-left'>
                        <h2 className='text-[#006CB8] text-2xl font-bold mb-1'>N{totalBonus}</h2>
                        <button className='bg-[#83C0EC] text-[#175682] py-1 px-3 rounded-md text-sm cursor-pointer'>Withdraw Bonus</button>
                    </div>
                </div>
                <div className='w-full p-2 bg-white rounded-lg mt-2'>
                    <h2 className='font-light text-xl my-4 ml-4'>My referrals: <span className='font-semibold text-[#175682]'>
                        {totalReferral}
                    </span></h2>
                    <RefferalTable />
                </div>
            </div>
        </motion.div>
    )
}

export default ReferralRewards