import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const { setUser } = useAuth();
  /** ホーム画面に遷移してからログインユーザー情報を削除する */
  const logout = async () => {
    changePage('/login')
    await supabase.auth.signOut();
    setUser(null);
  };

  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return <button className='btn btn-outline-secondary' onClick={logout}>ログアウト</button>;
};
