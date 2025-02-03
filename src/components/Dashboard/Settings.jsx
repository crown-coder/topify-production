import React from "react";
import { motion } from "framer-motion";
import SettiingsContainer from "./small-components/SettingsContainer";

const Settings = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <SettiingsContainer />
        </motion.div>
    );
};

export default Settings;
