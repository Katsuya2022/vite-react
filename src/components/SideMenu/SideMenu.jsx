import React from 'react'
import './SideMenu.css'
import SideMenuDatas from './SideMenuDatas';

const SideMenu = () => {
  const list = SideMenuDatas.map((data, index) => {
    return <a href={data.link}>{`${index}: ${data.text}`}</a>
  })
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
