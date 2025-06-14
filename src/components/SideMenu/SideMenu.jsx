import React from 'react'
import './SideMenu.css'
import SideMenuDatas from './SideMenuDatas';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return (
    <div className='side-menu'>
      <ul className='side-menu-list'>
        {SideMenuDatas.map((data, index) => {
          return (
            <li key={index} className='row' onClick={() => changePage(data.link)}>
              <div id='icon'>{data.icon}</div>
              <div id='text'>{data.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default SideMenu
