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

  handleChangeDropdown(sex) {
    this.store.setSex(sex.value);
  }

  render() {
    return (
      <div>
        <Dropdown
          options={['ALL', 'MEN', 'WOMEN']}
          onChange={this.handleChangeDropdown.bind(this)}
          placeholder={this.store.sex.toUpperCase()} />
      </div>
    );
  }
}
