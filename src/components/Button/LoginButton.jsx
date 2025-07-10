import { supabase } from '../../lib/supabase';

export const LoginButton = () => {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'example@example.com',
      password: 'yourpassword',
    });
    if (error) console.error(error.message);
  };

  return <button className='btn btn-success' onClick={handleLogin}>ログイン</button>;
};
