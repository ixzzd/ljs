import React from 'react';
import { NavLink } from 'react-router-dom'
import facebookImg from '../../images/facebook.png'
import vkImg from '../../images/vk.png'
import instagramImg from '../../images/instagram.png'
import Search from "./Search";


export default class Tools extends React.Component {
  render() {
    return (
      <div className='tools'>
        <NavLink className='contact-button' activeClassName='active' to='/about'>
          ABOUT
        </NavLink>
        <NavLink className='contact-button' activeClassName='active' to='/contacts'>
          CONTACT
        </NavLink>
        <Search />
        <div>
          <a className='social-button' href='https://www.instagram.com/lumpenmen'>
            <img src={instagramImg} alt='hello-icon' />
          </a>
        </div>
        <div>
          <a className='social-button' href='https://www.facebook.com/lumpenmen'>
            <img src={facebookImg} alt='hello-icon' />
          </a>
        </div>
        <div>
          <a className='social-button' href='https://vk.com/lumpenmen'>
            <img src={vkImg} alt='hello-icon' />
          </a>
        </div>
      </div>
    );
  }
}
