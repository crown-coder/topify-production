import React, { useEffect, useState } from 'react'
import PricingCard from './PricingCard'
import Cat from '../../assets/home/cat.png'
import FirstStartFish from '../../assets/home/star-fish.png'
import SecondStartFish from '../../assets/home/star-fish2.png'
import ThirdStartFish from '../../assets/home/star-fish3.png'
import FourthStartFish from '../../assets/home/star-fish4.png'
import MtnIcon from '../../assets/home/mtn.png'
import AirtelIcon from '../../assets/home/airtel.png'
import GloIcon from '../../assets/home/glo.png'
import NineMobileIcon from '../../assets/home/9mobile.png'

const Pricing = () => {
    const [networkPlans, setNetworkPlans] = useState({})

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch('https://app.topify.ng/api/data-plans?key=dataplan6b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q')
                const data = await res.json()

                const plansByNetwork = {}

                data.mobile_networks.forEach(network => {
                    const code = network.code.toLowerCase()
                    let plans = []
                    network.plan_types.forEach(type => {
                        if (type.data_plans?.length) {
                            plans.push(...type.data_plans)
                        }
                    })
                    plansByNetwork[code] = plans
                })

                console.log("Plans by network", plansByNetwork)
                setNetworkPlans(plansByNetwork)
            } catch (err) {
                console.error('Failed to fetch plans:', err)
            }
        }

        fetchPlans()
    }, [])

    return (
        <section className='w-full min-h-dvh bg-[#F8FBF8] flex flex-col gap-14 items-center p-20 max-lg:px-2 relative'>
            <h1 className='text-black text-4xl'>Pricings and Plans</h1>

            {/* decorations */}
            <img src={Cat} className='absolute top-0 w-[500px] opacity-20' alt="Cat decoration" />
            <img src={FirstStartFish} className='absolute w-[150px] top-24 left-0' alt="Star fish decoration" />
            <img src={FourthStartFish} className='absolute w-[200px] top-0 right-0' alt="Star fish decoration" />
            <img src={ThirdStartFish} className='absolute w-[200px] bottom-0 left-28' alt="Star fish decoration" />
            <img src={SecondStartFish} className='absolute w-[150px] bottom-20 right-0' alt="Star fish decoration" />

            <div className='max-lg:w-[90%] grid grid-cols-4 max-lg:grid-cols-1 gap-4'>
                <PricingCard icon={MtnIcon} networkCode="mtn" plans={networkPlans["mtn"] || []} />
                <PricingCard icon={AirtelIcon} networkCode="airtel" plans={networkPlans["airtel"] || []} />
                <PricingCard icon={GloIcon} networkCode="glo" plans={networkPlans["glo"] || []} />
                <PricingCard icon={NineMobileIcon} networkCode="9mobile" plans={networkPlans["9mobile"] || []} />
            </div>
        </section>
    )
}

export default Pricing
