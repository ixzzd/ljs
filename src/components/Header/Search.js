import React from 'react';
import Dropdown from 'react-dropdown'
import { observer, inject } from 'mobx-react';
import { withRouter } from "react-router-dom";

@inject("store")
@withRouter
@observer
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleChange(event) {
    this.store.setSearch(event.target.value);
  }

  handleFocus(event) {
    this.store.setCity('all');
    this.store.setSex('all');
    this.props.history.push('/all')
  }
  render() {
    return (
      <div className="headerItem">
        <input className='search'
               type='text'
               placeholder='search by name/height'
               name='search'
               value={this.store.search}
               onChange={this.handleChange}
               onFocus={this.handleFocus} />
      </div>
    );
  }
}
