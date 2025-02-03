import React from 'react'
import { refferalData } from '../../../constants/constants'
const RefferalTable = () => {
    return (
        <div className='px-5 pb-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            {refferalData.length === 0 ? (
                <p className='text-center text-gray-500'>No refferal record</p>
            ) : (
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
                        {refferalData.map((refferal, index) => (
                            <tr key={index} className='border-b border-gray-100 text-sm text-[#434343]'>
                                <td className='p-2'>{refferal.id}</td>
                                <td>{refferal.username}</td>
                                <td className='max-lg:hidden'>{refferal.phoneNumber}</td>
                                <td className='max-lg:hidden'>{refferal.email}</td>
                                <td>{refferal.Bonus}</td>
                                <td>{refferal.dateJoined}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default RefferalTable
