import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
  const navigate = useNavigate();
  
  return <button className='btn btn-success' onClick={() => navigate('/login')}>ログイン</button>;
};
