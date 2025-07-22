import React, { useEffect, useState } from 'react'
import './SideMenu.css'
import { HOME_MENU, USER_MENU, DEVELOPER_MENU } from './SideMenuDatas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SideMenu = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [sideMenuDatas, setSideMenuDatas] = useState([]);
  const changePage = (page) => {
    navigate(page);
  }
  const ROLE = {
    DEVELOPER: 0, // 開発者
    USER: 1, // 一般ユーザー
  }

  //ログインの有無、ユーザーの権限に合わせたメニューを設定する
  useEffect(() => {
    if (!profile) {
      setSideMenuDatas(HOME_MENU);
    } else if (profile.role === ROLE.USER) {
      setSideMenuDatas(USER_MENU);
    } else if (profile.role === ROLE.DEVELOPER ) {
      setSideMenuDatas(DEVELOPER_MENU);
    }
  }, [profile])

  return (
    <div className='side-menu'>
      <ul className='side-menu-list'>
        {
          // ログインしていない場合はホーム以外のボタンは表示しない
          sideMenuDatas.map((data, index) => (
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
