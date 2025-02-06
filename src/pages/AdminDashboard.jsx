import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import {
    AirtimePlans,
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

const AdminDashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
            <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} iconsOnly={iconsOnly} />
            <div className={`flex-1 rounded-lg transition-all duration-100 ${iconsOnly ? "lg:ml-[80px]" : "lg:ml-[240px]"} relative mt-2`} onClick={handleSideBarClose}>
                <Profile setIsSidebarOpen={setIsSidebarOpen} toggleIconsOnly={toggleIconsOnly} />
                <Routes>
                    <Route path='' element={<MainDashboard />} />
                    <Route path='user-funding' element={<UserFunding />} />
                    <Route path='transactions' element={<Transactions />} />
                    <Route path='analytics' element={<Analytics />} />
                    <Route path='data-plans' element={<DataPlans />} />
                    <Route path='airtime-plans' element={<AirtimePlans />} />
                    <Route path='tv-plans' element={<TvPlans />} />
                    <Route path='users' element={<Users />} />
                    <Route path='service-management' element={<ServiceManagement />} />
                    <Route path='service-discounts' element={<ServiceDiscounts />} />
                    <Route path='service-charges' element={<ServiceCharges />} />
                    <Route path='referral-promo' element={<ReferralPromo />} />
                    <Route path='configuration' element={<Configuration />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminDashboard
