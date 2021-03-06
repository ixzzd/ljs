import React from 'react';
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <div className='logo'>
        <Link to='/all'>
          {"LUMPEN"+ (this.store.sex == 'all' ? '' : this.store.sex).toUpperCase()}
        </Link>
      </div>
    );
  }
}
