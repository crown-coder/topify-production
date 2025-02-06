import React from 'react'
import { motion } from "framer-motion";
import Balance from "./small-components/Balance"
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
        </motion.div>
    )
}

export default MainDashboard
