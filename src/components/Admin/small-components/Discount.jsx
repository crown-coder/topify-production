import React from 'react'
import DiscountCard from './DiscountCard'
import MTNSQRT from '../../../assets/MTNSQRT.png'
import NINESQRT from '../../../assets/9SQRT.png'
import GLOSQRT from '../../../assets/GLOSQRT.png'
import AIRTELSQRT from '../../../assets/AIRTELSQRT.png'

const Discount = () => {
  return (
    <div className='px-5 py-3 bg-white dark:bg-gray-800 w-full my-2 rounded-xl'>
      <div className='w-full grid grid-cols-2 gap-6'>
        {/* Cards */}
        <DiscountCard title="MTN" ImageUrl={MTNSQRT} />
        <DiscountCard title="Airtel" ImageUrl={AIRTELSQRT} />
        <DiscountCard title="Glo" ImageUrl={GLOSQRT} />
        <DiscountCard title="9Mobile" ImageUrl={NINESQRT} />
      </div>
    </div>
  )
}

export default Discount
