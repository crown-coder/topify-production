import React, { useState } from 'react'
import { motion } from "framer-motion";
import { electricCompany } from '../../constants/constants'
import Prepaid from '../../assets/prepaid.png'
import Postpaid from '../../assets/postpaid.png'
const PayElectricityBill = () => {
    const [activeCompany, setActiveCompany] = useState("JED");

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-5 flex flex-col items-center gap-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl">
                <div className="flex justify-between overflow-x-scroll w-[30%] max-lg:w-[70%] mt-3 p-1 rounded-lg relative">
                    {electricCompany.map((el, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCompany(el.name)}
                            className={`flex items-center justify-center rounded-full border transition-all duration-100 border-blue-700 ${activeCompany === el.name ? 'scale-125 border-2' : ''}`}>

                            <img
                                src={el.image}
                                className='w-[45px] h-[45px] object-contain max-lg:w-[35px] max-lg:h-[35px] '
                            />
                        </button>
                    ))}
                </div>
                <div className='mt-10 w-[80%] max-lg:w-[90%] grid grid-cols-2 max-lg:grid-cols-1 gap-2'>
                    <div className='bg-[#2CA0F2] h-[250px] max-lg:h-[160px] rounded-lg relative text-center pt-8 cursor-pointer'>
                        <h2 className='text-white font-bold text-5xl max-lg:text-3xl uppercase'>Prepaid</h2>
                        <img src={Prepaid} alt="prepaid" className='w-[220px] max-lg:w-[150px] absolute bottom-0 right-0' />
                    </div>
                    <div className='bg-[#C2D9EA] h-[250px] max-lg:h-[160px] rounded-lg  relative text-center pt-8 cursor-pointer'>
                        <h2 className='text-[#006CB8] font-bold text-5xl max-lg:text-3xl uppercase'>Postpaid</h2>
                        <img src={Postpaid} alt="postpaid" className='w-[220px] max-lg:w-[150px] absolute bottom-0 right-0' />
                    </div>

                </div>

            </div>
        </motion.div>
    )
}

export default PayElectricityBill
