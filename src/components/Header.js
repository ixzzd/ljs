import React from "react";
import { NavLink } from 'react-router-dom'
import facebookImg from '../images/facebook.png'
import vkImg from '../images/vk.png'
import instagramImg from '../images/instagram.png'
import Title from "./Header/Title";
import Search from "./Header/Search";
import City from "./Header/City";
import Sex from "./Header/Sex";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <Title />

        <NavLink className='contact-button headerItem' activeClassName='active' to='/about'>
          ABOUT
        </NavLink>

        <NavLink className='contact-button headerItem' activeClassName='active' to='/contacts'>
          CONTACT
        </NavLink>

        <div className="filters headerItem">
          <p>CITY: </p>
          <City />
          <p className='sex'>SEX: </p>
          <Sex />
        </div>

        <Search />

        <a className='social-button headerItem' href='https://www.instagram.com/lumpenmen'>
          <img src={instagramImg} alt='hello-icon' />
        </a>

        <a className='social-button headerItem' href='https://www.facebook.com/lumpenmen'>
          <img src={facebookImg} alt='hello-icon' />
        </a>

        <a className='social-button headerItem' href='https://vk.com/lumpenmen'>
          <img src={vkImg} alt='hello-icon' />
        </a>
      </nav>
    );
  }
}
