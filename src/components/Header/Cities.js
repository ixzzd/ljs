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
    this.props.history.push('/' + item.value.toLowerCase())
  }

  render() {
    const cities = this.store.cities.sort((a, b) => a.position - b.position)
                                    .map(city => (city.name.toUpperCase()))
    const currentCity = this.store.city.toUpperCase();
    cities.splice(cities.indexOf(currentCity), 1);

    return (
      <div className='cities' >
        <Dropdown
          options={cities}
          onChange={this.handleChangeDropdown.bind(this)}
          placeholder={currentCity} />
      </div>
    );
  }
}
