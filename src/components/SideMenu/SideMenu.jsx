import React from 'react'
import './SideMenu.css'
import SideMenuDatas from './SideMenuDatas';

const SideMenu = () => {
  const list = SideMenuDatas.map((data, index) => (
    <div key={index}>
      <a href={data.link}>
        {data.icon}
        {data.text}
      </a>
    </div>
  ))
  return (
    <div className='side-menu'>
      side-menu
      <div>
        {list}
      </div>
    </div>
  )
}

export default SideMenu
