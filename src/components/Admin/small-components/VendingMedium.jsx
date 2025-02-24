import React from 'react'
import Card from './Cards'
import Glove from '../../../assets/glove.png'

const VendingMedium = () => {
    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <h2 className='text-[#434343] text-2xl mb-3'>Vending Medium APIs</h2>
            <div className='w-full grid grid-cols-2 gap-6'>
                {/* Cards */}
                <Card title="Smartdatalinks" preType="API Type" PreSubtype="Balance" data="Msgorg" airtime="" imageUrl={Glove} />
                <Card title="Smart Tech API" preType="API Type" PreSubtype="Balance" data="SmartTech" airtime="" imageUrl={Glove} />
                <Card title="Sabr Data" preType="API Type" PreSubtype="Balance" data="Msgorg" airtime="" imageUrl={Glove} />
                <Card title="Autofy" preType="API Type" PreSubtype="Balance" data="Autofy" airtime="" imageUrl={Glove} />
            </div>
        </div>
    )
}

export default VendingMedium
