const ProfileForm = () => {
    return (
        <div className="w-full mt-2 py-4 px-3 bg-white dark:bg-gray-800 rounded-lg relative">
            <form>
                <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-5'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='fullname' className='text-sm font-light'>Full name</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" placeholder='Jeff Grimes' name='fullname' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='usertag' className='text-sm font-light'>User Tag</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" placeholder='jefftherealdeal' name='usertag' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email' className='text-sm font-light'>Email</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="email" placeholder='grimejeffy@gmail.com' name='email' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='state' className='text-sm font-light'>State</label>
                        <select className='p-2 rounded-lg border text-[#989898] text-sm font-light' >
                            <option value="Bauchi">Bauchi</option>
                            <option value="lagos">Gombe</option>
                            <option value="abuja">Abuja</option>
                            <option value="kano">Kano</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='phone' className='text-sm font-light'>Phone Number</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="number" placeholder='0810000000' name='phone' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='lga' className='text-sm font-light'>Local Government</label>
                        <select className='p-2 rounded-lg border text-[#989898] text-sm font-light' name="lga" >
                            <option value="Bauchi">Bauchi</option>
                            <option value="Kirfi">Kirfi</option>
                            <option value="Ganjuwa">Ganjuwa</option>
                            <option value="Alkaleri">Alkaleri</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='language' className='text-sm font-light'>Language</label>
                        <select className='p-2 rounded-lg border text-[#989898] text-sm font-light' name="language" >
                            <option value="Hausa">Hausa</option>
                            <option value="Fulfulde">Fulfulde</option>
                            <option value="Yoroba">Yoroba</option>
                            <option value="Igbo">Igbo</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='welcome' className='text-sm font-light'>Welcome Message</label>
                        <input className='p-2 rounded-lg border text-[#989898] text-sm font-light' type="text" placeholder='Welcome, jeff' name='welcome' />
                    </div>
                    <div>
                        <button className='w-full py-2 border font-normal text-[#4F4F4F] text-lg rounded-lg'>Cancel</button>
                    </div>
                    <div>
                        <button type='submit' className='w-full py-2 text-white font-semibold text-lg rounded-lg bg-[#4CACF0]'>Save Changes</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default ProfileForm
