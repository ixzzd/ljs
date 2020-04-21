import React from "react";
import { observer, inject } from 'mobx-react';
import logoImg from '../images/logo.png'

@inject("store")
@observer
export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <div className='info'>
        <img src={logoImg} alt='logo' className='logo'/>
        <p>Lumpen is an agency with an extensive casting base comprised of exclusive Russian faces coming from all over the globe. Founded and launched by Avdotja Alexandrova in 2014.</p>

        <p>
          Booking: <a href="mailto:lumpenmen@gmail.com">lumpenmen@gmail.com</a>
          &nbsp;
          <a href="mailto:lumpenwomen@gmail.com">lumpenwomen@gmail.com</a>
          <br/>
          Casting: <a href="mailto:lumpencasting@gmail.com">lumpencasting@gmail.com</a>
        </p>
        <p>
          Code: <a href="https://github.com/ixzzd">Egor Chemokhonenko</a>
        </p>

        <p className='footer'>Lumpen 2014-2020 ©</p>
      </div>
    );
  }
}
