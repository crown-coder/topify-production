import React from 'react'
import TvCard from './Cards/TvCard'
const Dstv = ({ onClick }) => {
    return (
        <div className='grid grid-cols-5 gap-1'>
            <div></div>
            <TvCard onClick={onClick} title="DSTV Smallie" amount="N1,300" duration="Monthly" className="bg-[#2EA2F5]" />
            <TvCard onClick={onClick} title="DSTV Jinja" amount="N2,700" duration="Monthly" className="col-span-2 bg-[#2EA2F5]" />
            <div></div>
            <TvCard onClick={onClick} title="DSTV Smallie" amount="N1,300" duration="Monthly" className="bg-[#2EA2F5]" />
            <TvCard onClick={onClick} title="DSTV Max" amount="N5,700" duration="3 Months" className="col-span-3 bg-[#006CB8]" txt="text-4xl max-lg:text-2xl" />
            <TvCard onClick={onClick} title="DSTV Smallie" amount="N3,750" duration="Quaterly" className="bg-[#2EA2F5]" />
            <div></div>
            <div></div>
            <TvCard onClick={onClick} title="DSTV Joli" amount="N3,950" duration="Monthly" className="col-span-2 bg-[#2EA2F5]" />
            <div></div>
        </div>
    )
}

export default Dstv
