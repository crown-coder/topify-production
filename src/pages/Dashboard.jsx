import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar"
import Profile from "../components/Dashboard/Profile"
import ModelLayout from '../components/Dashboard/small-components/ModelLayout.jsx'
import { useModal } from '../components/ModalContext.jsx'

import {
    MainDashboard,
    FundWallet,
    Transaction,
    WalletToWallet,
    BuyAirtime,
    BuyData,
    AirtimeToCash,
    PayElectricityBill,
    PayTvBill,
    ResultChecker,
    ReferralRewards,
    Settings
} from '../components/Dashboard/index.js'

import ProfileSection from '../components/Dashboard/small-components/ProfileSection'
import ChangeBankDetails from '../components/Dashboard/small-components/ChangeBankDetails'
import FundWithVoucher from '../components/Dashboard/small-components/FundWithVoucher'
import DeleteAccount from '../components/Dashboard/small-components/DeleteAccount'


const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isModalOpen, modalContent, closeModal } = useModal() // Access modal stat
    const [iconsOnly, setIconsOnly] = useState(false);

    const toggleIconsOnly = () => {
        setIconsOnly((prev) => !prev);
    };

    const handleSideBarClose = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        } else {
            return
        }
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-dvh flex gap-2">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} iconsOnly={iconsOnly} closeModal={closeModal} />
            <div className={`flex-1 rounded-lg transition-all duration-100 ${iconsOnly ? "lg:ml-[80px]" : "lg:ml-[240px]"} relative mt-2`} onClick={handleSideBarClose}>
                <Profile setIsSidebarOpen={setIsSidebarOpen} toggleIconsOnly={toggleIconsOnly} />
                <Routes>
                    <Route path='' element={<MainDashboard />} />
                    <Route path='fund-wallet' element={<FundWallet />} />
                    <Route path='transactions' element={<Transaction />} />
                    <Route path='wallet-to-wallet' element={<WalletToWallet />} />
                    <Route path='buy-airtime' element={<BuyAirtime />} />
                    <Route path='buy-data' element={<BuyData />} />
                    <Route path='airtime-to-cash' element={<AirtimeToCash />} />
                    <Route path='pay-electricity-bill' element={<PayElectricityBill />} />
                    <Route path='pay-tv-bill' element={<PayTvBill />} />
                    <Route path='result-checker' element={<ResultChecker />} />
                    <Route path='referral-rewards' element={<ReferralRewards />} />
                    {/* <Route path='virtual-card' element={<VirtualCard />} /> */}
                    <Route path='settings' element={<Settings />} />
                    <Route path='logout' element={<Settings />} />

                    <Route path='settings/profile' element={<ProfileSection />} />
                    <Route path='settings/change-bank-details' element={<ChangeBankDetails />} />
                    <Route path='settings/fund-with-voucher' element={<FundWithVoucher />} />
                    <Route path='settings/delete-account' element={<DeleteAccount />} />
                </Routes>
                {/* Modal onClick={closeModal} */}
                {isModalOpen && (
                    <div className='absolute top-0 w-full h-full bg-gray-400/50 z-50 flex justify-center items-center transition-all duration-100 '>
                        {modalContent}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
