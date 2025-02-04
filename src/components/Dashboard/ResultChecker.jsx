import React, { useState } from 'react'
import { motion } from "framer-motion";
import ResultCard from './small-components/ResultCard'
import Neco from '../../assets/neco.png'
import Waec from '../../assets/waec.png'
import Nabtab from '../../assets/nabtap.png'
import { useModal } from "../ModalContext"
import CardLayout from './small-components/Cards/CardLayout'
import Confetti from "react-confetti";
import FinishCard from './small-components/Cards/FinishCard';

const ResultChecker = () => {

    const [quantity, setQuantity] = useState()

    const { openModal, closeModal } = useModal();


    const handleQuantityChange = (e) => {
        setQuantity(e.target.value); // Update the state with the input value
    };

    const handleWaecSucessCard = (e) => {
        e.preventDefault();

        openModal(
            <CardLayout cardTitle="WEAC Pin Purchase" closeModal={closeModal}>
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <FinishCard message={`You Have Successfully Purchase ${quantity} Waec Pins.`} />
            </CardLayout>
        );
    }

    const handleNecoSucessCard = (e) => {
        e.preventDefault();

        openModal(
            <CardLayout cardTitle="NECO Pin Purchase" closeModal={closeModal}>
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <FinishCard message={`You Have Successfully Purchase ${quantity} NECO Pins.`} />
            </CardLayout>
        );
    }

    const handleNabtebSucessCard = (e) => {
        e.preventDefault();

        openModal(
            <CardLayout cardTitle="NABTEB Pin Purchase" closeModal={closeModal}>
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <FinishCard message={`You Have Successfully Purchase ${quantity} WAEC Pins.`} />
            </CardLayout>
        );
    }

    const waecModal = () => {
        openModal(
            <CardLayout cardTitle="WAEC Results Checker" closeModal={closeModal}>
                <form className="flex flex-col">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='exam-name' className='text-sm font-light'>Exam Name</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" value="Waec" name='waec' readOnly />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='quantity' className='text-sm font-light'>Quantity</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' value={quantity} onChange={handleQuantityChange} type="number" placeholder='Quantity' name='quantity' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='amount' className='text-sm font-light'>Amount</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="number" value={2000} name='amount' readOnly />
                    </div>
                    <button onClick={handleWaecSucessCard} type="submit" className="w-full p-2 mt-3 bg-[#4CACF0] rounded-md text-white font-bold">Generate</button>
                </form>
            </CardLayout>
        )
    }

    const necoModal = () => {
        openModal(
            <CardLayout cardTitle="NECO Results Checker" closeModal={closeModal}>
                <form>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='exam-name' className='text-sm font-light'>Exam Name</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" value="Neco" name='neco' readOnly />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='quantity' className='text-sm font-light'>Quantity</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' value={quantity} onChange={handleQuantityChange} type="number" placeholder='Quantity' name='quantity' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='amount' className='text-sm font-light'>Amount</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="number" value={2000} name='amount' readOnly />
                    </div>
                    <button onClick={handleNecoSucessCard} type="submit" className="w-full p-2 mt-3 bg-[#4CACF0] rounded-md text-white font-bold">Generate</button>
                </form>
            </CardLayout>
        )
    }

    const nabtabModal = () => {
        openModal(
            <CardLayout cardTitle="NABTAB Results Checker" closeModal={closeModal}>
                <form>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='exam-name' className='text-sm font-light'>Exam Name</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" value="Nabtab" name='nabteb' readOnly />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='quantity' className='text-sm font-light'>Quantity</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="number" value={quantity} onChange={handleQuantityChange} placeholder='Quantity' name='quantity' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='amount' className='text-sm font-light'>Amount</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="number" value={2000} name='amount' readOnly />
                    </div>
                    <button onClick={handleNabtebSucessCard} type="submit" className="w-full p-2 mt-3 bg-[#4CACF0] rounded-md text-white font-bold">Generate</button>
                </form>
            </CardLayout>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className='w-full flex justify-center items-center rounded-xl bg-white mt-2 py-12 relative'
        >
            <div className="w-[55%] max-lg:w-[80%] grid grid-cols-2 gap-4 max-lg:grid-cols-1">
                <ResultCard className="row-span-2 bg-[#61AE42]" imageUrl={Waec} onClick={waecModal} />
                <ResultCard className="bg-[#4CACF0]" imageUrl={Neco} onClick={necoModal} />
                <ResultCard className="bg-[#006CBB]" imageUrl={Nabtab} onClick={nabtabModal} />
            </div>
        </motion.div>
    )
}

export default ResultChecker
