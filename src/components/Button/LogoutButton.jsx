import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export const LogoutButton = () => {
  const { setUser } = useAuth();
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <button className='btn btn-outline-secondary' onClick={logout}>ログアウト</button>;
};
