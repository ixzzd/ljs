import React from 'react';
import { NavLink } from 'react-router-dom'
import facebookImg from '../../images/facebook.png'
import vkImg from '../../images/vk.png'
import instagramImg from '../../images/instagram.png'

export default class Tools extends React.Component {
  render() {
    return (
      <div className='tools'>
        <div className='contact-button'>
          <NavLink activeClassName='active' to='/contacts'>
            CONTACT
          </NavLink>
        </div>
        <div>
          <input className='search' type='text' name='search' value='SEARCH'></input>
        </div>
        <div>
          <a className='social-button' href='/'>
            <img src={instagramImg} alt='hello-icon' />
          </a>
        </div>
        <div>
          <a className='social-button' href='/'>
            <img src={facebookImg} alt='hello-icon' />
          </a>
        </div>
        <div>
          <a className='social-button' href='/'>
            <img src={vkImg} alt='hello-icon' />
          </a>
        </div>
      </div>
    );
  }
}
