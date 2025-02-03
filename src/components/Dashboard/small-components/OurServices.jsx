import React from 'react'
import { useNavigate } from 'react-router-dom'
import Service from './Service'

import Wallet from '../../../assets/wallet-add.png'
import Globe from '../../../assets/global.png'
import AtmCard from '../../../assets/card.png'
import Call from '../../../assets/call.png'
import Bolt from '../../../assets/bolt.png'
import VideoPlay from '../../../assets/video-play.png';

const OurServices = () => {
    const navigate = useNavigate();

    return (
        <div className='p-5 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <div className=' w-full flex justify-between items-center'>
                <h2 className='text-xl text-gray-900'>Our Services</h2>
            </div>
            <div className='mt-4 lg:mx-16 grid grid-cols-3 gap-3 lg:gap-10'>
                <Service
                    icon={Wallet}
                    title="Fund Wallet"
                    onClick={() => navigate('fund-wallet')}
                />
                <Service
                    icon={Globe}
                    title="Buy Data"
                    onClick={() => navigate('buy-data')}
                />
                <Service
                    icon={AtmCard} title="Virtual Card"
                    onClick={() => navigate('virtual-card')}
                />

                <Service
                    icon={Call}
                    title="Buy Airtime"
                    onClick={() => navigate('buy-airtime')}
                />
                <Service
                    icon={Bolt} title="Electricity Bill"
                    onClick={() => navigate('pay-electricity-bill')}
                />
                <Service
                    icon={VideoPlay} title="TV Bill"
                    onClick={() => navigate('pay-tv-bill')}
                />
            </div>

        </div>
    )
}

export default OurServices
