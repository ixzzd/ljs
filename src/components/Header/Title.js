import React from 'react';
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.appState;
  }

  render() {
    return (
      <div className='logo'>
        <Link to='/all'>
          if (this.store.sex == 'man') {
            "LUMPENMEN"
          } else if (this.store.sex == 'woman') {
            "LUMPENWOMEN"
          } else {
            "LUMPEN"
          }
        </Link>
      </div>
    );
  }
}
