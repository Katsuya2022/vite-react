import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    furigana: '',
    age: '',
    gender: '',
    affiliation: '',
    hasSpouse: '',
    education: '',
    nearestStation: '',
    qualifications: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!form.name || !form.furigana || !form.gender || !form.hasSpouse) {
      setErrorMsg('必須項目をすべて入力してください。');
      setLoading(false);
      return;
    }

    const { email, password } = form;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert('確認メールを送信しました。メールをご確認ください。');
      navigate('/login');
    }
  };

  return (
    <div className='signup'>
      <h1>新規登録</h1>
      <div className='wrapper'>
        <form className='signup-form' onSubmit={handleSignUp}>
          {/* メール / パスワード */}
          <div className="mb-3">
            <label className="form-label">メールアドレス（必須）</label>
            <input type="email" className="form-control" name="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">パスワード（必須）</label>
            <input type="password" className="form-control" name="password" required minLength={6} value={form.password} onChange={handleChange} />
          </div>

          {/* 基本情報 */}
          <div className="mb-3">
            <label className="form-label">名前（必須）</label>
            <input type="text" className="form-control" name="name" required value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">フリガナ（必須）</label>
            <input type="text" className="form-control" name="furigana" required value={form.furigana} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">年齢</label>
            <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} />
          </div>

          {/* 性別 */}
          <div className="mb-3">
            <label className="form-label d-block">性別（必須）</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="gender-male" value="男" onChange={handleChange} />
              <label className="form-check-label" htmlFor="gender-male">男</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="gender-female" value="女" onChange={handleChange} />
              <label className="form-check-label" htmlFor="gender-female">女</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="gender-other" value="-" onChange={handleChange} />
              <label className="form-check-label" htmlFor="gender-other">-</label>
            </div>
          </div>

          {/* 所属 */}
          <div className="mb-3">
            <label className="form-label">所属</label>
            <input type="text" className="form-control" name="affiliation" value={form.affiliation} onChange={handleChange} />
          </div>

          {/* 配偶者の有無 */}
          <div className="mb-3">
            <label className="form-label d-block">配偶者の有無（必須）</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="hasSpouse" id="hasSpouse-yes" value="有" onChange={handleChange} />
              <label className="form-check-label" htmlFor="hasSpouse-yes">有</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="hasSpouse" id="hasSpouse-no" value="無" onChange={handleChange} />
              <label className="form-check-label" htmlFor="hasSpouse-no">無</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="hasSpouse" id="hasSpouse-na" value="-" onChange={handleChange} />
              <label className="form-check-label" htmlFor="hasSpouse-na">-</label>
            </div>
          </div>

          {/* 最終学歴 */}
          <div className="mb-3">
            <label className="form-label">最終学歴</label>
            <input type="text" className="form-control" name="education" value={form.education} onChange={handleChange} />
          </div>

          {/* 最寄駅 */}
          <div className="mb-3">
            <label className="form-label">最寄駅</label>
            <input type="text" className="form-control" name="nearestStation" value={form.nearestStation} onChange={handleChange} />
          </div>

          {/* 保有資格 */}
          <div className="mb-3">
            <label className="form-label">保有資格</label>
            <textarea className="form-control" name="qualifications" rows="3" value={form.qualifications} onChange={handleChange}></textarea>
          </div>

          {/* エラー / ボタン */}
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? '登録中...' : '登録する'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
