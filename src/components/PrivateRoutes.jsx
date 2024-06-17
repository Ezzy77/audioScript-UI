import { Outlet, Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({user}) => {
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
