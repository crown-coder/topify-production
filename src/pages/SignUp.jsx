import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/logo.png'
import AuthPageLayout from '../components/AuthPageLayout'

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        address: '',
        referral: ''
    })

    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setFieldErrors({})

        // if (formData.password !== formData.password_confirmation) {
        //     setError('Passwords do not match')
        //     setLoading(false)
        //     return
        // }

        try {

            const response = await axios.post('/api/register', formData)

            if (response.status === 200 || response.status === 201) {
                alert('Registration successful!')
                navigate('/login')
                console.log("Registration successful!")
            }
        } catch (err) {

            if (err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors)
                setError('')
            } else if (err.response?.data?.message) {
                setError(err.response.data.message)
                setFieldErrors({})
            } else if (!err.response) {
                setError('Network error. Please check your internet connection.') // fallback for network-related issues
            } else {
                setError('Something went wrong. Please try again.')
                setFieldErrors({})
            }

        } finally {
            setLoading(false)
        }
    }


    return (
        <AuthPageLayout>
            <div className='bg-white p-5 rounded-3xl shadow-lg flex flex-col gap-3 items-center w-[35%] max-lg:w-[85%]'>
                <img src={Logo} alt='Logo' className='w-[70px] h-[70px]' />
                <div className='text-center'>
                    <h2 className='text-blue-950 font-semibold text-lg'>Getting Started</h2>
                    <p className='text-sm text-gray-500'>Create an account to continue!</p>
                </div>

                {error && <p className='text-red-500 text-sm'>{error}</p>}

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full mt-4'>
                    <div>
                        <label htmlFor='name' className='text-sm text-gray-400'>Full Name</label>
                        <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Enter your full name' required />
                        {fieldErrors.name && <p className='text-red-500 text-xs'>{fieldErrors.name[0]}</p>}
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor='email' className='text-sm text-gray-400'>Email</label>
                            <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Enter your email' required />
                            {fieldErrors.email && <p className='text-red-500 text-xs'>{fieldErrors.email[0]}</p>}
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor='phone' className='text-sm text-gray-400'>Phone No.</label>
                            <input type='text' id='phone' value={formData.phone} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' name='phone' placeholder='Enter your phone Number' required />
                            {fieldErrors.phone && <p className='text-red-500 text-xs'>{fieldErrors.phone[0]}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='password' className='text-sm text-gray-400'>Password</label>
                            <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Enter your password' required />
                            {fieldErrors.password && <p className='text-red-500 text-xs'>{fieldErrors.password[0]}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='password_confirmation' className='text-sm text-gray-400'>Confirm Password</label>
                            <input type='password' id='password_confirmation' name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Confirm your password' required />
                            {/* {fieldErrors.password_confirmation && <p className='text-red-500 text-xs'>{fieldErrors.password_confirmation[0]}</p>} */}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='address' className='text-sm text-gray-400'>Address</label>
                            <input type='text' id='address' name='address' value={formData.address} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Enter your Address' required />
                            {fieldErrors.address && <p className='text-red-500 text-xs'>{fieldErrors.address[0]}</p>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='referral' className='text-sm text-gray-400'>Refferal (Optional)</label>
                            <input type='text' id='referral' name='referral' value={formData.referral} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Refferal Code' />
                        </div>
                    </div>
                    <button type='submit' className='w-full p-2 rounded-lg border text-white bg-[#4CACF0] cursor-pointer'>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <div className='text-center'>
                        <p className='text-gray-400'>Already Have an Account? <Link to="/login" className='underline text-blue-500'>Login</Link></p>
                    </div>
                </form>
            </div>
        </AuthPageLayout>
    )
}

export default SignUp
