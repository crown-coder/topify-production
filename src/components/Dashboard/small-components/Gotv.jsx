import React from 'react'
import TvCard from './Cards/TvCard'

const Gotv = ({ onClick }) => {
    return (
        <div className='grid grid-cols-5 gap-1'>
            <div></div>
            <TvCard onClick={onClick} title="GOtv Smallie" amount="N1,300" duration="Monthly" className="bg-green-500" />
            <TvCard onClick={onClick} title="GOtv Jinja" amount="N2,700" duration="Monthly" className="col-span-2 bg-green-500" />
            <div></div>
            <TvCard onClick={onClick} title="GOtv Smallie" amount="N1,300" duration="Monthly" className="bg-green-500" />
            <TvCard onClick={onClick} title="GOtv Max" amount="N5,700" duration="3 Months" className="col-span-3 bg-green-800" txt="text-4xl max-lg:text-2xl" />
            <TvCard onClick={onClick} title="GOtv Smallie" amount="N3,750" duration="Quaterly" className="bg-green-500" />
            <div></div>
            <div></div>
            <TvCard onClick={onClick} title="GOtv Joli" amount="N3,950" duration="Monthly" className="col-span-2 bg-green-500" />
            <div></div>
        </div>
    )
}

export default Gotv
