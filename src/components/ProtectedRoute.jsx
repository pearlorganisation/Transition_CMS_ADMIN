// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { isAdminLoggedIn } = useSelector(state => state.auth);
    const location = useLocation();

    if (!isAdminLoggedIn) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default ProtectedRoute;