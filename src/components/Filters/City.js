import React from 'react';
import Dropdown from 'react-dropdown'
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";

@inject("store")
@withRouter
@observer
export default class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this)
  }

  handleChangeDropdown(item) {
    this.store.setCity(item.value)
    this.props.history.push('/' + item.value.toLowerCase());
  }

  render() {
    return (
      <div className='cities' >
        <Dropdown
          options={this.store.displayedCities}
          onChange={this.handleChangeDropdown.bind(this)}
          placeholder={this.store.city.toUpperCase()} />
      </div>
    );
  }
}
