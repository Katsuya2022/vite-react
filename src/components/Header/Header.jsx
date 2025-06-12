import React from 'react'
import './Header.css'
import { useNavigate  } from 'react-router-dom'

const Header = () => {
  const title = 'Title';
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(page);
  }

  return (
    // <div className='header'>
    //   <h1 id='title' onClick={() => changePage('/')}>{title}</h1>
    // </div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a id='title' className="navbar-brand" onClick={() => changePage('/')}>{title}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" onClick={() => changePage('/')}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => changePage('/page1')}>Page1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => changePage('/page2')}>Page2</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
