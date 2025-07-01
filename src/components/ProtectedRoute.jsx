// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true; // Ensure axios uses credentials by default
const ProtectedRoute = ({ children }) => {

    const logCheck = async () => {
        await axios.get('https://app.topify.ng/sanctum/csrf-cookie');
    }

    logCheck()

    const token = Cookies.get('XSRF-TOKEN') || Cookies.get('topify_session');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;