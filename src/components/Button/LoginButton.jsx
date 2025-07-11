import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export const LoginButton = () => {
  const navigate = useNavigate();
  // const handleLogin = async () => {
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email: 'example@example.com',
  //     password: 'yourpassword',
  //   });
  //   if (error) console.error(error.message);
  // };

  return <button className='btn btn-success' onClick={() => navigate('/login')}>ログイン</button>;
};
