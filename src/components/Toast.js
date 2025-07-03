import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = (type = 'info', message = '') => {
    const config = {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    switch (type) {
        case 'success':
            toast.success(message, config)
            break
        case 'error':
            toast.error(message, config)
            break
        case 'warn':
        case 'warning':
            toast.warning(message, config)
            break
        case 'info':
        default:
            toast.info(message, config)
            break
    }
}

export default notify
