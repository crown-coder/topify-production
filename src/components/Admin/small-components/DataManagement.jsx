import React from 'react'
import Card from './Cards'
import MTNSQRT from '../../../assets/MTNSQRT.png'
import NINESQRT from '../../../assets/9SQRT.png'
import GLOSQRT from '../../../assets/GLOSQRT.png'
import AIRTELSQRT from '../../../assets/AIRTELSQRT.png'

const DataManagement = () => {
    return (
        <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
            <h2 className='text-[#434343] text-2xl mb-3'>Data Management</h2>
            <div className='w-full grid grid-cols-2 gap-6'>
                {/* Cards */}
                <Card title="MTN" preType="Data" PreSubtype="Airtime" data="Active" airtime="Active" imageUrl={MTNSQRT} />
                <Card title="Airtel" preType="Data" PreSubtype="Airtime"  data="Active" airtime="Active" imageUrl={AIRTELSQRT} />
                <Card title="Glo" preType="Data" PreSubtype="Airtime"  data="Active" airtime="Active" imageUrl={GLOSQRT} />
                <Card title="9Mobile" preType="Data" PreSubtype="Airtime"   data="Active" airtime="Active" imageUrl={NINESQRT} />
            </div>
        </div>
    )
}

export default DataManagement
