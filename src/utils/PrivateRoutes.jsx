import { Outlet, Navigate} from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'


const PrivateRoutes = () => {
    
    let { user } = useAuthContext();
    return(
        !user ? window.location.href="https://tajify.com/login" : <Outlet/>
    )
}

export default PrivateRoutes;