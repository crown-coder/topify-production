import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { useModal } from '../components/ModalContext'
import {
    DataType,
    Analytics,
    Configuration,
    DataPlans,
    MainDashboard,
    Profile,
    ReferralPromo,
    ServiceCharges,
    ServiceDiscounts,
    ServiceManagement,
    SideBar,
    Transactions,
    TvPlans,
    UserFunding,
    Users
} from "../components/Admin/index"

import { WebsiteSettings, PaymentGateway, TransactionAPI, EmailConfig, AdvanceConfig } from '../components/Admin/small-components/SettingsSections/index'

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [iconsOnly, setIconsOnly] = useState(false);
    const { isModalOpen, modalContent, closeModal } = useModal();

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
        <div className="bg-gray-100 dark:bg-gray-900 min-h-dvh flex gap-2 overflow-hidden">
            <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} iconsOnly={iconsOnly} closeModal={closeModal} />
            <div className={`flex-1 rounded-lg transition-all duration-100 ${iconsOnly ? "lg:ml-[80px]" : "lg:ml-[240px]"} relative mt-2 overflow-x-hidden`} onClick={handleSideBarClose}>
                <div className="w-full h-full overflow-auto">
                    <Profile setIsSidebarOpen={setIsSidebarOpen} toggleIconsOnly={toggleIconsOnly} />
                    <Routes>
                        <Route path='' element={<MainDashboard />} />
                        <Route path='user-funding' element={<UserFunding />} />
                        <Route path='transactions' element={<Transactions />} />
                        <Route path='analytics' element={<Analytics />} />
                        <Route path='data-plans' element={<DataPlans />} />
                        <Route path='data-type' element={<DataType />} />
                        <Route path='tv-plans' element={<TvPlans />} />
                        <Route path='users' element={<Users />} />
                        <Route path='service-management' element={<ServiceManagement />} />
                        <Route path='service-discounts' element={<ServiceDiscounts />} />
                        <Route path='service-charges' element={<ServiceCharges />} />
                        <Route path='referral-promo' element={<ReferralPromo />} />
                        <Route path='configuration' element={<Configuration />} />

                        <Route path='configuration/website-settings' element={<WebsiteSettings />} />
                        <Route path='configuration/payment-geteway' element={<PaymentGateway />} />
                        <Route path='configuration/transaction-api' element={<TransactionAPI />} />
                        <Route path='configuration/email-config' element={<EmailConfig />} />
                        <Route path='configuration/advance-config' element={<AdvanceConfig />} />
                    </Routes>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className='absolute top-0 w-full h-full bg-gray-400/50 z-50 flex justify-center items-center transition-all duration-100'>
                    {modalContent}
                </div>
            )}
        </div>
    )
}

export default AdminDashboard