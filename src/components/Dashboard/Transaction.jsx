import TransactionHeader from "./small-components/TransactionHeader";
import TransactionTable from "./small-components/TransactionTable";
import { motion } from "framer-motion";

const Transactions = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl"
        >
            <TransactionHeader />
            {/* transactions */}
            <div className="h-[490px] max-lg:h-auto rounded-xl overflow-y-auto">
                <TransactionTable />
            </div>
        </motion.div>
    );
};

export default Transactions;
