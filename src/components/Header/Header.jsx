import React from 'react'
import './Header.css'
import { useNavigate  } from 'react-router-dom'

const Header = () => {
  const title = 'title';
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return (
    <div className='header'>
      <h1 id='title' onClick={() => changePage('/')}>{title}</h1>
    </div>
  )
}

export default Header
