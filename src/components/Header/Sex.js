import React from 'react';
import Dropdown from 'react-dropdown'
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
export default class Sex extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.store.changeSex()
  }

  render() {
    return (
      <div className='contacts' >
        <a href="#" onClick={this.handleClick}>
          { this.store.sex == 'men' ? 'WOMEN' : 'MEN' }
        </a>
      </div>
    );
  }
}
