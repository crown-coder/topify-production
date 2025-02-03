import React, { useState } from 'react'
import { motion } from "framer-motion";
import GOTV from '../../assets/gotv.png'
import DSTV from '../../assets/dstv.png'
import STARTIMES from '../../assets/startimes.png'
import Gotv from './small-components/Gotv';
import Startimes from './small-components/Startimes';
import Dstv from './small-components/Dstv';
import TvSubCard from './small-components/Cards/SubCard';

import { useModal } from '../ModalContext';

const PayTvBill = () => {
    const [activeTv, setActiveTv] = useState("GOTV");
    const { openModal } = useModal();

    const handleMorePlans = () => {
        openModal(
            <TvSubCard />
        )
    }

    const TvNetworks = [
        { name: "GOTV", image: GOTV },
        { name: "DSTV", image: DSTV },
        { name: "Startimes", image: STARTIMES },
    ];

    let content;

    if (activeTv === "GOTV") {
        content = <Gotv onClick={handleMorePlans} />
    } else if (activeTv === "DSTV") {
        content = <Dstv onClick={handleMorePlans} />
    } else if (activeTv === "Startimes") {
        content = <Startimes onClick={handleMorePlans} />
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className='relative'
        >
            <div className='mt-2 pt-8 h-[600px] rounded-lg w-full bg-white flex max-lg:flex-col items-center justify-center gap-3'>
                <div className='flex flex-col max-lg:flex-row gap-3 items-center'>
                    {/* buttons */}
                    {TvNetworks.map((TvNetwork, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTv(TvNetwork.name)}
                            className={`w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-100 border border-[#057DD1] ${activeTv === TvNetwork.name ? 'scale-125 border-2' : ''}`}
                        >
                            <img
                                src={TvNetwork.image}
                                className='w-[40px] h-[40px] rounded-s-full object-contain'
                            />
                        </button>
                    ))}
                </div>
                <div className='w-[60%] max-lg:mt-4 max-lg:w-[95%] flex flex-col items-center transition-all duration-150'>
                    {/* cards */}
                    {content}
                    <button
                        className='w-[60%] my-4 py-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'
                    >
                        More Plans
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default PayTvBill
