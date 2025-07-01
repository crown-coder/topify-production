import React from 'react'

const EmailConfig = () => {
    return (
        <div className='w-full my-2 rounded-xl bg-white p-3'>
            <form>
                <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-3'>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-transport" className='text-sm text-[#1E1E1E] font-light'>Mail Transport</label>
                        <input type="text" id="mail-transport" name="mail-transport" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="welcome" className='text-sm text-[#1E1E1E] font-light'>Mail URL</label>
                        <input type="text" id="mail-url" name="mail-url" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-host" className='text-sm text-[#1E1E1E] font-light'>Mail Host</label>
                        <input type="text" id="mail-host" name="mail-host" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-port" className='text-sm text-[#1E1E1E] font-light'>Mail Port</label>
                        <input type="text" id="mail-port" name="mail-port" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-encryption" className='text-sm text-[#1E1E1E] font-light'>Mail Encryption</label>
                        <input type="text" id="welcome" name="mail-encyption" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-username" className='text-sm text-[#1E1E1E] font-light'>Mail Username</label>
                        <input type="text" id="mail-username" name="mail-username" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-password" className='text-sm text-[#1E1E1E] font-light'>Mail Password</label>
                        <input type="text" id="mail-password" name="mail-password" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-timeout" className='text-sm text-[#1E1E1E] font-light'>Mail Timeout</label>
                        <input type="text" id="mail-timeout" name="mail-timeout" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-ehlo-domain" className='text-sm text-[#1E1E1E] font-light'>Mail EHLO Domain</label>
                        <input type="text" id="mail-ehlo-domain" name="mail-ehlo-domain" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-from-address" className='text-sm text-[#1E1E1E] font-light'>Mail From Address</label>
                        <input type="text" id="mail-from-address" name="mail-from-address" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlfor="mail-from-name" className='text-sm text-[#1E1E1E] font-light'>Mail From Name</label>
                        <input type="text" id="mail-from-name" name="mail-from-name" className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' />
                    </div>
                    <div className='flex'></div>
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

export default EmailConfig
