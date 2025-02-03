import React from 'react'
import TvCard from './Cards/TvCard'
const Startimes = ({ onClick }) => {
    return (
        <div className='grid grid-cols-5 gap-1'>
            <div></div>
            <TvCard onClick={onClick} title="Startimes Smallie" amount="N1,300" duration="Monthly" className="bg-orange-400" />
            <TvCard onClick={onClick} title="Startimes Jinja" amount="N2,700" duration="Monthly" className="col-span-2 bg-orange-400" />
            <div></div>
            <TvCard onClick={onClick} title="Startimes Smallie" amount="N1,300" duration="Monthly" className="bg-orange-400" />
            <TvCard onClick={onClick} title="Startimes Max" amount="N5,700" duration="3 Months" className="col-span-3 bg-orange-600" txt="text-4xl max-lg:text-2xl" />
            <TvCard onClick={onClick} title="Startimes Smallie" amount="N3,750" duration="Quaterly" className="bg-orange-400" />
            <div></div>
            <div></div>
            <TvCard onClick={onClick} title="Startimes Joli" amount="N3,950" duration="Monthly" className="col-span-2 bg-orange-400" />
            <div></div>
        </div>
    )
}

export default Startimes
