import React from "react";
import Balance from "./small-components/Balance";
import Accounts from "./small-components/Accounts";
import OurServices from "./small-components/OurServices";
import { motion } from "framer-motion";

const DashboardContent = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="max-lg:px-3 overflow-y-auto"
        >
            <Balance />
            <Accounts />
            <OurServices />
        </motion.div>
    );
};

export default DashboardContent;
