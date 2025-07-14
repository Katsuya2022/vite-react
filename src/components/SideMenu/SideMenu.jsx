import React, { useEffect } from 'react'
import './SideMenu.css'
import SideMenuDatas from './SideMenuDatas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SideMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return (
    <div className='side-menu'>
      <ul className='side-menu-list'>
        {
          // ログインしていない場合はホーム以外のボタンは表示しない
          (user ? SideMenuDatas : SideMenuDatas.filter(data => data.text === 'Home'))
            .map((data, index) => (
              <li
                id={window.location.pathname === data.link ? 'active' : ''}
                className='menu-item'
                key={index}
                onClick={() => changePage(data.link)}
              >
                <div id='icon'>{data.icon}</div>
                <div id='text'>{data.text}</div>
              </li>
            ))
        }
      </ul>
    </div>
  )
}

export default SideMenu
