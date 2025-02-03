import React from "react";
import Form from './small-components/Form'
import { motion } from "framer-motion";

const WalletToWallet = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className='mt-5 p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <Form />
            </div>

        </motion.div>
    );
};

export default WalletToWallet;
