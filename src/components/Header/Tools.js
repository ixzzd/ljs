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
        <div className='contact-button'>
          <NavLink activeClassName='active' to='/contacts'>
            CONTACT
          </NavLink>
        </div>
        <Search />
        <div>
          <a className='social-button' href='https://www.facebook.com/lumpenmen'>
            <img src={instagramImg} alt='hello-icon' />
          </a>
        </div>
        <div>
          <a className='social-button' href='https://www.instagram.com/lumpenmen/'>
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
