import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RefferalTable = () => {
    const [referrals, setReferrals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await axios.get('/api/referrals')
                setReferrals(response.data)
            } catch (error) {
                console.error('Error fetching referrals:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchReferrals()
    }, [])

    if (loading) {
        return (
            <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <p className='text-center py-4'>Loading referrals...</p>
            </div>
        )
    }

    if (referrals.length === 0) {
        return (
            <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <p className='text-center py-4 text-gray-500'>No referral records found</p>
            </div>
        )
    }

    return (
        <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='border border-gray-100 py-2 rounded-lg bg-[#FAFAFA] text-[#969A98] text-sm text-left'>
                        <th className='p-2 font-light'>S/N</th>
                        <th className='font-light'>Username</th>
                        <th className='font-light max-lg:hidden'>Phone number</th>
                        <th className='font-light max-lg:hidden'>Email</th>
                        <th className='font-light'>Bonus</th>
                        <th className='font-light'>Date joined</th>
                    </tr>
                </thead>
                <tbody>
                    {referrals.map((referral, index) => (
                        <tr key={referral.id} className='border-b border-gray-100 text-sm text-[#434343]'>
                            <td className='p-2'>{index + 1}</td>
                            <td>{referral.user.name}</td>
                            <td className='max-lg:hidden'>{referral.user.phone}</td>
                            <td className='max-lg:hidden'>{referral.user.email}</td>
                            <td>{referral.bonus_earn}</td>
                            <td>{referral.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RefferalTable