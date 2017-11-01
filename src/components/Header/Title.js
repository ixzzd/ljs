import React from 'react';
import { Link } from 'react-router-dom'

export default class Title extends React.Component {
  render() {
    return (
      <div className='logo'>
      	<Link to='/'>
      		LUMPENMEN
      	</Link>
      </div>
    );
  }
}
