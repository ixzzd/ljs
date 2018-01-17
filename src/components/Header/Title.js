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
      	<Link to='/'>
          { this.store.currentModel && this.store.currentModel.sex == 'women' ? 'LUMPENTEST' : 'LUMPENMEN' }
      	</Link>
      </div>
    );
  }
}
