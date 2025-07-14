import React from 'react';
import './Header.css';
import { useNavigate  } from 'react-router-dom';
import { LoginButton } from '../Button/LoginButton';
import { LogoutButton } from '../Button/LogoutButton';
import HeaderDatas from './HeaderDatas';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const title = 'Title';
  const { user } = useAuth();
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a id='title' className="navbar-brand" onClick={() => changePage('/')}>{title}</a>
        {/* モバイル表示時のハンバーガーボタン */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            {
              HeaderDatas.items.map((item, index) => (
                <li key={index} className='nav-item' role="button">
                  <a className="nav-link" aria-current="page" onClick={() => changePage(item.link)}>{item.text}</a>
                </li>
              ))
            }
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
              </a>
              <ul className="dropdown-menu">
                {
                  HeaderDatas.dropdownItems.map((item, index) => (
                    <li key={index}>
                      <a className='dropdown-item' href={item.link}>{item.text}</a>
                    </li>
                  ))
                }
              </ul>
            </li>
          </ul>
          <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center">
              {/* supabeseとユーザ情報用のテーブルを連携したらemailからユーザー名に変更する */}
              <span className="m-2">{`${user ? user.email : 'ゲスト'} さん、こんにちは`}</span>
            </div>
            {
              user
              ? <LogoutButton></LogoutButton>
              : <LoginButton></LoginButton>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
