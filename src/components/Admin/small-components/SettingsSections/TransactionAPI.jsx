import React from 'react'

const TransactionAPI = () => {
  return (
    <div className='w-full my-2 rounded-xl shadow-sm bg-white p-3'>
      <form>
        <h2 className='text-[#434343] text-xl font-bold mb-3'>Monnify</h2>
        <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlfor="api-type" className='text-sm text-[#1E1E1E] font-light'>API Type</label>
            <select name='api-type' id='api-type' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' >
              <option value="">Select</option>
              <option value="coming">Coming</option>
              <option value="coming">Coming</option>
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlfor="transaction-api-url" className='text-sm text-[#1E1E1E] font-light'>Transaction Api Url (Enter only url without / example:https//webdata.com)</label>
            <input type="text" id="transaction-api-url" name="transaction-api-url" placeholder='www.smartdatalinks.com' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlfor="transaction-api" className='text-sm text-[#1E1E1E] font-light'>Transaction API Token</label>
            <input type="text" id="transaction-api" name="transaction-api" placeholder='ee*************************6b' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
          </div>
          <div></div>
          {/* Buttons */}
          <div className='flex flex-col gap-1'>
            <button className='w-full py-3 rounded-lg border text-[#434343] font-bold cursor-pointer'>Back</button>
          </div>
          <div className='flex flex-col gap-1'>
            <button type="submit" className='w-full py-3 rounded-lg border border-[#4CACF0] bg-[#4CACF0] hover:bg-[#39a2ed] transition-all duration-75 text-[#FFFFFF] font-bold cursor-pointer'>Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TransactionAPI
