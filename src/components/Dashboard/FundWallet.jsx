import React from "react";
import Wellcome from "./small-components/Wellcome";
import Accounts from "./small-components/Accounts";
import Methods from './small-components/Methods';
import { motion } from "framer-motion";

const FundWallet = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <Wellcome />
            <Accounts />
            <Methods />
        </motion.div>
    );
};

export default FundWallet;
