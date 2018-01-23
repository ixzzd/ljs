import React from "react";
import { observer, inject } from 'mobx-react';
import logoImg from '../images/logo.png'

@inject("store")
@observer
export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
  }

  render() {
    return (
      <div className='contacts'>
        <img src={logoImg} alt='logo' className='logo'/>
        <p>Lumpen is an agency with extensive casting base of exclusive Russian faces from all over the world.</p>

        <p>
          founder: <a href="mailto:lumpenmen@gmail.com">Avdotja Alexandrova</a>
          &nbsp;
          developer: <a href="https://github.com/ixzzd">Egor Chemokhonenko</a>
        </p>

        <p>clients:</p>
        <div className='partners'>
          {this.store.partners.map(partner => (
            <span>
              <a key={partner.name} href={partner.link}>{partner.name}</a>
            </span>
          ))}
        </div>

        <p className='footer'>Lumpen 2014-2018 ©</p>
      </div>
    );
  }
}
