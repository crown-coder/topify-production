import React, { useState } from 'react'
import { motion } from "framer-motion";
import GOTV from '../../assets/gotv.png'
import DSTV from '../../assets/dstv.png'
import STARTIMES from '../../assets/startimes.png'
import Gotv from './small-components/Gotv';
import Startimes from './small-components/Startimes';
import Dstv from './small-components/Dstv';
import GotvPlans from './small-components/GotvPlans';
import DstvPlans from './small-components/DstvPlans';
import StartimesPlans from './small-components/StartimesPlans';
import TvSubCard from './small-components/Cards/SubCard';
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import CardLayout from './small-components/Cards/CardLayout'
import { useModal } from '../ModalContext';

const PayTvBill = () => {
    const navigate = useNavigate();
    const [activeTv, setActiveTv] = useState("GOTV");
    const { openModal, closeModal } = useModal();

    const handleNavigateToTransactionHistory = () => {
        navigate("/dashboard/pay-tv-bill/tv-bill-table");
    }

    // Enhanced TV subscription form handler
    const handleTvSubForm = (plan) => {
        openModal(
            <TvSubCard
                provider={activeTv}
                plan={plan}
                closeModal={closeModal}
            />
        )
    }

    // Create individual content plans with proper click handlers
    const individualContentPlan = (() => {
        switch (activeTv) {
            case "GOTV":
                return <GotvPlans onClick={handleTvSubForm} />;
            case "DSTV":
                return <DstvPlans onClick={handleTvSubForm} />;
            case "Startime":
                return <StartimesPlans onClick={handleTvSubForm} />;
            default:
                return null;
        }
    })();

    const handleMorePlans = () => {
        openModal(
            <CardLayout cardTitle={`${activeTv} Plans`} closeModal={closeModal}>
                {individualContentPlan}
            </CardLayout>
        )
    }

    const TvNetworks = [
        { name: "GOTV", image: GOTV },
        { name: "DSTV", image: DSTV },
        { name: "Startime", image: STARTIMES },
    ];

    // Main content with proper click handlers
    const content = (() => {
        switch (activeTv) {
            case "GOTV":
                return <Gotv onClick={handleTvSubForm} />;
            case "DSTV":
                return <Dstv onClick={handleTvSubForm} />;
            case "Startime":
                return <Startimes onClick={handleTvSubForm} />;
            default:
                return null;
        }
    })();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className='relative'
        >
            <div className='mt-2 pt-8 px-5 h-[600px] rounded-lg w-full bg-white flex flex-col items-center gap-3'>
                <div className="w-full mb-5 flex justify-end ">
                    <button
                        className="cursor-pointer text-gray-600 text-sm flex gap-1 items-center transition-all duration-100 hover:text-[#4CACF0]"
                        onClick={handleNavigateToTransactionHistory}
                    >
                        <span>View All Purchase</span>
                        <MdKeyboardArrowRight className="text-xl" />
                    </button>
                </div>
                <div className='mt-2 pt-8 h-[600px] rounded-lg w-full bg-white flex max-lg:flex-col items-center justify-center gap-8'>
                    <div className='flex flex-col max-lg:flex-row gap-3 items-center'>
                        {TvNetworks.map((TvNetwork, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTv(TvNetwork.name)}
                                className={`w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-100 border border-[#057DD1] ${activeTv === TvNetwork.name ? 'scale-125 border-2' : ''}`}
                                aria-label={`Select ${TvNetwork.name}`}
                            >
                                <img
                                    src={TvNetwork.image}
                                    alt={TvNetwork.name}
                                    className='w-[40px] h-[40px] rounded-s-full object-contain'
                                />
                            </button>
                        ))}
                    </div>
                    <div className='w-[60%] max-lg:mt-4 max-lg:w-[95%] flex flex-col items-center transition-all duration-150'>
                        {content}
                        <button
                            onClick={handleMorePlans}
                            className='w-[60%] my-4 py-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'
                        >
                            More Plans
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default PayTvBill