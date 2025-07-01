import React from 'react'
import ConfigurationCard from './ConfigurationCard'
import { useNavigate } from "react-router-dom"
import WebIcon from '../../../assets/webset.png'
import GateWayIcon from '../../../assets/gateway.png'
import ApiIcon from '../../../assets/apiTran.png'
import EmailConIcon from '../../../assets/emailCon.png'
import AdvanConIcon from '../../../assets/advanceCon.png'

const ConfigurationContainer = () => {
    const navigate = useNavigate()

    return (
        <div className="p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl">
            <div className="mt-4 max-lg:mx-7 grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-5 gap-3">
                <ConfigurationCard
                    className="bg-[#2CA0F2] text-white"
                    title="Website Settings"
                    imageUrl={WebIcon}
                    onClick={() => navigate('website-settings')}
                />
                <ConfigurationCard
                    className="bg-[#C2D9EA] text-[#006CB8]"
                    title="Payment Gateway"
                    imageUrl={GateWayIcon}
                    onClick={() => navigate('payment-geteway')}
                />
                <ConfigurationCard
                    className="bg-[#C2D9EA] text-[#006CB8]"
                    title="Transaction API"
                    imageUrl={ApiIcon}
                    onClick={() => navigate('transaction-api')}
                />
                <ConfigurationCard
                    className="bg-[#2CA0F2] text-white"
                    title="Email Config"
                    imageUrl={EmailConIcon}
                    onClick={() => navigate('email-config')}
                />
                <ConfigurationCard
                    className="bg-[#2CA0F2] text-white"
                    title="Advance Settings"
                    imageUrl={AdvanConIcon}
                    onClick={() => navigate('advance-config')}
                />
            </div>
        </div>
    )
}

export default ConfigurationContainer
