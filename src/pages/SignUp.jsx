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
    name_kana: '',
    age: '',
    gender: '-',
    affiliation: '',
    has_spouse: '-',
    education: '',
    nearest_station: '',
    qualifications: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const genderLabels = ['男', '女', '-']; 
  const hasSpouseLabels = ['有', '無', '-']

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /** 新規登録処理 */
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // 必須項目のチェック
    if (!form.name || !form.name_kana || !form.gender || !form.has_spouse) {
      setErrorMsg('必須項目をすべて入力してください。');
      setLoading(false);
      return;
    }

    const { email, password, ...profileData } = form;

    // supabaseのユーザー登録
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    // supabaseのユーザー登録に失敗した場合、エラーを表示して以降の処理を中止する
    if (signUpError) {
      setErrorMsg(signUpError.message);
      setLoading(false);
      return;
    }

    // 認証が成功し、ユーザーが取得できた場合のみプロフィールを登録
    const user = authData.user;
    const { error: profileError } = await supabase.from('profiles').insert({
      id: user.id,  // idはsupabaseに登録した際のUIDを紐づける
      email,
      ...profileData,
    });

    // プロフィール情報の登録に失敗した場合、エラーを表示して以降の処理を中止する
    if (profileError) {
      setErrorMsg('プロフィール情報の保存に失敗しました: ' + profileError.message);
      setLoading(false);
      return;
    }

    // 登録が完了したら、ログイン画面に遷移させる
    alert('確認メールを送信しました。メールをご確認ください。');
    navigate('/login');
    setLoading(false);
  };

  return (
    <div className='signup'>
      <h1>新規登録</h1>
      <form onSubmit={handleSignUp}>
        {/* メール / パスワード */}
        <div className="mb-3">
          <label className="form-label">メールアドレス<span className='text-danger'>（必須）</span></label>
          <input type="email" className="form-control" name="email" required value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">パスワード<span className='text-danger'>（必須）</span></label>
          <input type="password" className="form-control" name="password" required minLength={6} value={form.password} onChange={handleChange} />
        </div>

        {/* 基本情報 */}
        <div className="mb-3">
          <label className="form-label">名前<span className='text-danger'>（必須）</span></label>
          <input type="text" className="form-control" name="name" required value={form.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">フリガナ<span className='text-danger'>（必須）</span></label>
          <input type="text" className="form-control" name="name_kana" required value={form.name_kana} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">年齢</label>
          <input type="number" className="form-control" name="age" min={0} max={100} value={form.age} onChange={handleChange} />
        </div>

        {/* 性別 */}
        <div className="mb-3">
          <label className="form-label d-block">性別<span className='text-danger'>（必須）</span></label>
          {genderLabels.map((label, index) => (
            <div className="form-check form-check-inline" key={`gender-${index}`}>
              <input
                id={`gender-${label}`}
                className="form-check-input"
                type="radio"
                name="gender"
                value={label}
                checked={form.gender === label}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`gender-${label}`}>{label}</label>
            </div>
          ))}
        </div>

        {/* 所属 */}
        <div className="mb-3">
          <label className="form-label">所属</label>
          <input type="text" className="form-control" name="affiliation" value={form.affiliation} onChange={handleChange} />
        </div>

        {/* 配偶者の有無 */}
        <div className="mb-3">
          <label className="form-label d-block">配偶者の有無<span className='text-danger'>（必須）</span></label>
          {hasSpouseLabels.map((label, index) => (
            <div className="form-check form-check-inline" key={`has_spouse-${index}`}>
              <input
                id={`has_spouse-${label}`}
                className="form-check-input"
                type="radio"
                name="has_spouse"
                value={label}
                checked={form.has_spouse === label}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={`has_spouse-${label}`}>{label}</label>
            </div>
          ))}
        </div>

        {/* 最終学歴 */}
        <div className="mb-3">
          <label className="form-label">最終学歴</label>
          <input type="text" className="form-control" name="education" value={form.education} onChange={handleChange} />
        </div>

        {/* 最寄駅 */}
        <div className="mb-3">
          <label className="form-label">最寄駅</label>
          <input type="text" className="form-control" name="nearest_station" value={form.nearest_station} onChange={handleChange} />
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
  );
};

export default SignUp;
