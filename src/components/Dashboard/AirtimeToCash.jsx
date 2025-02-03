import React from 'react'
import { motion } from "framer-motion";
import AirtimeToCashForm from './small-components/AirtimeToCashForm'
const AirtimeToCash = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'
        >
            <AirtimeToCashForm />
        </motion.div>
    )
}

export default AirtimeToCash
