import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user, isReady } = useAuth();

  // 認証情報がまだロードされていない場合は何も表示しない
  if (!isReady) {
    return <div>Loading...</div>; // ここはスピナーなどにすることも検討する
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
