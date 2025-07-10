import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/logo.png'
import AuthPageLayout from '../components/AuthPageLayout'
import { useAuth } from '../hooks/useAuth'

const ForgotPassword = () => {
    useAuth({ middleware: 'guest', redirectIfAuthenticated: '/dashboard' })
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: ''
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

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, formData)

            if (response.status === 200 || response.status === 201) {
                alert('Password reset link sent to your email!')
                navigate('/login')
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
                    <h2 className='text-blue-950 font-semibold text-lg'>Password Recovery</h2>
                    <p className='text-sm text-gray-500'>Enter your email to recover your password</p>
                </div>

                {error && <p className='text-red-500 text-sm'>{error}</p>}

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full mt-4'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='email' className='text-sm text-gray-400'>Email</label>
                        <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Enter your email' required />
                        {fieldErrors.email && <p className='text-red-500 text-xs'>{fieldErrors.email[0]}</p>}
                    </div>

                    <button type='submit' className='w-full p-2 rounded-lg border text-white bg-[#4CACF0] cursor-pointer'>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <div className='text-center'>
                        <p className='text-gray-400'>Back to Login? <Link to="/login" className='underline text-blue-500'>Login</Link></p>
                    </div>
                </form>

            </div>

        </AuthPageLayout>
    )
}

export default ForgotPassword
