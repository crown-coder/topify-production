import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../assets/logo.png'
import AuthPageLayout from '../components/AuthPageLayout'
import AlertBox from '../components/Dashboard/small-components/AlertBox'
import Cookies from 'js-cookie'

// axios.defaults.withCredentials = true; // Ensure axios uses credentials by default

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        // await axios.get('https://app.topify.ng/sanctum/csrf-cookie');

        e.preventDefault()
        setLoading(true)
        setError('')
        setFieldErrors({})


        try {

            const response = await axios.post(`/api/login`, formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: true,
                })
            // withCredentials: true,

            if (response.status === 200 || response.status === 201) {
                navigate('/dashboard/')
            }

        } catch (err) {
            if (err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors)
                setError('')
            } else if (err.response?.data?.message) {
                setError(err.response.data.message)
                setFieldErrors({})
            } else if (!err.response) {
                setError('Network error. Please check your internet connection.')
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
            <AlertBox />
            <div className='bg-white p-5 rounded-3xl shadow-lg flex flex-col gap-3 items-center w-[35%] max-lg:w-[85%]'>
                <img src={Logo} alt='Logo' className='w-[70px] h-[70px]' />
                <div className='text-center'>
                    <h2 className='text-blue-950 font-semibold text-lg'>Let’s Sign You In</h2>
                    <p className='text-sm text-gray-500'>Welcome back, We’ve missed you</p>
                </div>

                {error && <p className='text-red-500 text-sm'>{error}</p>}

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full mt-4'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='email' className='text-sm text-gray-400'>Email</label>
                        <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Enter your email' required />
                        {fieldErrors.email && <p className='text-red-500 text-xs'>{fieldErrors.email[0]}</p>}

                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='password' className='text-sm text-gray-400'>Password</label>
                        <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} className='w-full p-2 rounded-lg border text-[#989898] text-sm font-light' placeholder='Enter your password' required />
                        {fieldErrors.password && <p className='text-red-500 text-xs'>{fieldErrors.password[0]}</p>}
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type='checkbox' id='rememberMe' name='rememberMe' />
                        <label htmlFor='rememberMe' className='text-sm text-gray-400'>Remember Me</label>
                    </div>
                    <button type='submit' className='w-full p-2 rounded-lg border text-white bg-[#4CACF0] cursor-pointer'>
                        {loading ? 'Login...' : 'Login'}
                    </button>
                    <div className='text-center'>
                        <p className='text-gray-400'>Forgot Password? <Link to="/forgot-password" className='underline text-blue-500'>Reset</Link></p>
                    </div>
                    <div className='text-center'>
                        <p className='text-gray-400'>Don't have an account? <Link to="/signup" className='underline text-blue-500'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </AuthPageLayout>
    )
}

export default Login

