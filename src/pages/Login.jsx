// import React from 'react';
// import { LoginButton } from '../components/Button/LoginButton';
// import { LogoutButton } from '../components/Button/LogoutButton';

// const Login = () => {
//   return (
//     <div>
//       <LoginButton></LoginButton>
//       <LogoutButton></LogoutButton>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('yourpassword');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/'); // ログイン成功後にトップへリダイレクト
    }
  };

  return (
    <div className='login'>
      <h1>ログイン</h1>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">パスワード</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">ログイン</button>
      </form>
      <button className='btn btn-link' onClick={() => navigate('/signup')}>新規登録はこちら</button>
    </div>
  );
};

export default Login;
