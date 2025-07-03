// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from './Dashboard/small-components/Loader'

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (user === null) {
        return <Loader global="true" />
    }

    return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
