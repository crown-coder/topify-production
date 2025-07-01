import { useNavigate } from "react-router-dom";
import Form from './small-components/Form'
import { motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";

const WalletToWallet = () => {
    const navigate = useNavigate();

    const handleNavigateToTransactionHistory = () => {
        navigate("/dashboard/wallet-to-wallet/wallet-table");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
        >
            <div className='mt-2 p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
                <div className="mb-5 flex justify-end ">
                    <button className="cursor-pointer text-gray-600 text-sm flex gap-1 items-center transition-all duration-100 hover:text-[#4CACF0]" onClick={handleNavigateToTransactionHistory}>
                        <span>View All Transaction</span>
                        <MdKeyboardArrowRight className="text-xl" />
                    </button>
                </div>
                <Form />
            </div>

        </motion.div>
    );
};

export default WalletToWallet;
