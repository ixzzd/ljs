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
    this.store = this.props.store.appState;
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.store.setSearch(event.target.value);
  }

  render() {
    return (
      <div>
        <input className='search'
               type='text'
               placeholder='SEARCH'
               name='search'
               value={this.store.search}
               onChange={this.handleChange} />
      </div>
    );
  }
}
