import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import SideMenu from '../SideMenu/SideMenu';

import './AppLayout.css'

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className='contents-area'>
        <SideMenu />
        <Outlet />
      </div>
    </>
  )
}

export default AppLayout