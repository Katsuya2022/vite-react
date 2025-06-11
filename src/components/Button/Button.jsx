import React from 'react';
// import './Button.css';

const Button = ({ text, func }) => {
  const clickFunction = func;

  return (
    <button className='btn btn-primary' onClick={ clickFunction }>
      {text}
    </button>
  )
}

export default Button
