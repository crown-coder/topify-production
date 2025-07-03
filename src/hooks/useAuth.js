import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notify from '../components/Toast'

export const useAuth = ({
    middleware = 'auth',
    redirectIfAuthenticated = '/dashboard',
    shouldCallApi = true,
} = {}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/api2/user')
            setUser(res.data)
        } catch (err) {
            if (err.response?.status !== 409) {
                setError(err.response)
            }
        }
    }

    const login = async ({ setProcessing, ...props }) => {
        await csrf()
        axios.post('/api/login', props)
            .then(() => fetchUser())
            .catch(error => {
                setProcessing(false)
                if (error.response?.status !== 422) throw error.response
                Object.values(error.response.data.errors)
                    .flat()
                    .forEach(err => notify('error', err))
            })
    }

    const logout = async () => {
        try {
            await axios.post('/api/logout')
            console.log("Logout success")
            setUser(null)
        } catch (_) { }
        navigate('/')
    }

    useEffect(() => {
        if (shouldCallApi) fetchUser()
    }, [])

    useEffect(() => {
        if (middleware === 'guest' && user) {
            navigate(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error])

    return {
        user,
        login,
        logout,
    }
}
