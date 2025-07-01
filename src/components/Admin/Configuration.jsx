import React from 'react'
import { motion } from "framer-motion";
import ConfigurationContainer from './small-components/ConfigurationContainer'

const Configuration = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <ConfigurationContainer />
        </motion.div>
    )
}

export default Configuration
