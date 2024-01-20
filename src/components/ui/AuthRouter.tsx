import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../lib/redux/store';
export const ProtectedRoute = () => {
    const { user } = useSelector((state: RootState) => state.authuser)
    return user ? <Outlet /> : <Navigate to='/login'/>
}