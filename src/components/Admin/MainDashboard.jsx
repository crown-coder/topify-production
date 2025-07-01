import React from 'react'
import { motion } from "framer-motion";
import Balance from "./small-components/Balance"
import Summary from './small-components/Summary';
const MainDashboard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <Balance />
            <div className='px-5 grid grid-cols-3 gap-2 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <Summary title="Total Users" number={16} className="bg-[#4CACF0]" textColor="text-white" />
                <Summary title="Total Balance" number="N22,000" className="bg-[#F2FAFF]" textColor="text-[#232323]" />
                <Summary title="API Balance" number="N22,000" className="bg-[#F2FAFF]" textColor="text-[#232323]" />
            </div>
        </motion.div>
    )
}

export default MainDashboard
