import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
