import React from 'react'
import ToggleSwitch from '../../../ToggleSwitch'

const PaymentGateway = () => {
    return (
        <div className='w-full my-2'>
            <div className='flex flex-col mb-2 p-3 pb-8 shadow-sm bg-white w-full rounded-xl gap-3'>
                <h2 className='text-[#434343] text-xl font-bold'>General Settings</h2>
                <div className='flex flex-col gap-2'>
                    <label htmlfor="pay-method" className='text-sm text-[#1E1E1E] font-light'>Default Funding Bank</label>
                    <select name='pay-method' id='pay-method' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' >
                        <option value="moniepoint">Moniepoint</option>
                        <option value="stripe">stripe</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
            </div>

            <div className='w-full my-2 rounded-xl shadow-sm bg-white p-3'>
                <form>
                    <h2 className='text-[#434343] text-xl font-bold mb-3'>Monnify</h2>
                    <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlfor="api-key" className='text-sm text-[#1E1E1E] font-light'>Api Key</label>
                            <input type="text" id="api-key" name="api-key" placeholder='MK_PROD_9MXXD3LTVD' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlfor="secret-key" className='text-sm text-[#1E1E1E] font-light'>Secret Key</label>
                            <input type="text" id="secret-key" name="secret-key" placeholder='FZ********************JP' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlfor="contract-code" className='text-sm text-[#1E1E1E] font-light'>Contract Code</label>
                            <input type="text" id="contract-code" name="contract-code" placeholder='1234567654321' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlfor="funding-charges" className='text-sm text-[#1E1E1E] font-light'>Funding Charges</label>
                            <input type="text" id="funding-charges" name="funding-charges" placeholder='1.2%' className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                        </div>
                        <div className='flex'>
                            <ToggleSwitch text="Enable Service" />
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
        </div>
    )
}

export default PaymentGateway
