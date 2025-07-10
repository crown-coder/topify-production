// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from './Dashboard/small-components/Loader'

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (user === null) {
        // Still checking authentication status
        return <Loader global="true" />
    }

    // If not authenticated, redirect
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Authenticated, show protected content
    return children
}

export default ProtectedRoute
