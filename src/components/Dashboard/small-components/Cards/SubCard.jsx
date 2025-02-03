import React, { useState } from 'react'
import { useLocation } from "react-router-dom"
import ConfimCard from './ConfimCard'
import TvSubForm from '../Forms/TvSubForm'
import AirtimeForm from '../Forms/AirtimeForm'
import DataForm from '../Forms/DataForm'

const TvSubCard = () => {

    const [isConfrim, setIsConfirm] = useState(true);
    const [formData, setFormdata] = useState(null)
    const location = useLocation();


    const handleFormSubmit = (data) => {
        setFormdata(data);
        setIsConfirm(false);
    }

    const renderForm = () => {
        if (location.pathname === '/dashboard/buy-airtime') {
            return <AirtimeForm onSubmit={handleFormSubmit} />
        } else if (location.pathname === '/dashboard/pay-tv-bill') {
            return <TvSubForm onSubmit={handleFormSubmit} />
        } else if (location.pathname === '/dashboard/buy-data') {
            return <DataForm onSubmit={handleFormSubmit} />
        }
        return null;
    }


    return (
        <div className='rounded-lg p-4 bg-white w-[40%] max-lg:w-[95%]'>
            {isConfrim ? (
                renderForm()
            ) : (
                <ConfimCard data={formData} />
            )}
        </div>
    )
}

export default TvSubCard
