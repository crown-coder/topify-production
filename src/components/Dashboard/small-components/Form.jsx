import React from 'react'

const Form = () => {
    return (
        <div>
            <form>
                <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-5'>

                    <div className='flex flex-col gap-2'>
                        <label form='usertag' className='text-lg text-[#1E1E1E] font-light'>User Tag*</label>
                        <input className='p-3 border rounded-lg' type="text" placeholder='jefftherealdeal' name='usertag' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label form='amount' className='text-lg text-[#1E1E1E] font-light'>Amount*</label>
                        <input className='p-3 border rounded-lg' type="number" name='amount' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label form='narration' className='text-lg text-[#1E1E1E] font-light'>Narration</label>
                        <input className='p-3 border rounded-lg' type="text" placeholder='Optional' name='narration' />
                    </div>

                </div>
                <button type='submit' className='w-full my-4 py-4 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'>Proceed</button>
            </form>
        </div>
    )
}

export default Form
