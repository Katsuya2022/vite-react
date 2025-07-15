import React from 'react'
import './SideMenu.css'
import SideMenuDatas from './SideMenuDatas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SideMenu = () => {
  const { user, profile, isReady } = useAuth();
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }
  const ROLE = {
    DEVELOPER: 0,
    USER: 1,
  }

  // ユーザーごとに表示するメニューの内容を切り替えるため、プロフィールがロードされるまでは何も表示しない
  if (!isReady) {
    return <div className="side-menu">Loading...</div>
  }

  /**
   * 未ログインの時はHomeのみを表示する
   * ログインユーザーの権限が一般ユーザーの場合は、開発者専用メニューを非表示にする
   * @returns 条件ごとに絞り込んだサイドメニューデータ
   */
  const filteredSideMenuDatas = () => {
    if (!user) {
      return SideMenuDatas.filter(data => data.text === 'Home');
    } else if (profile?.role === ROLE.USER ) {
      return SideMenuDatas.filter(data => !data.devOnly);
    } else {
      return SideMenuDatas
    }
  }

  return (
    <div className='side-menu'>
      <ul className='side-menu-list'>
        {
          // ログインしていない場合はホーム以外のボタンは表示しない
            filteredSideMenuDatas().map((data, index) => (
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
