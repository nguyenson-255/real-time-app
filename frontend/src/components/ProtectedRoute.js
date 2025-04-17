import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../uttil/AuthContext';

const ProtectedRoute = () => {
    // const { token } = useAuth();
    const token = useSelector((state) => state.auth.token);

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
