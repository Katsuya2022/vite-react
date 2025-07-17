import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Supabaseの認証ユーザー
  const [profile, setProfile] = useState(null); // profiles テーブルの情報
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 初回読み込み時にセッションを取得
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(!profileError ? profileData : null);
      } else {
        setProfile(null);
      }
      setIsReady(true);
    };

    fetchUserAndProfile();

    // 認証状態が変更されたら更新
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // supabaseのデッドロック回避のためにsetTimeoutを使う(公式ドキュメント参照)
      setTimeout(async () => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          const { data, error } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
          setProfile(!error ? data : null);
        } else {
          setProfile(null);
        }
        setIsReady(true);
      }, 0);
    })
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, setUser, setProfile, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
