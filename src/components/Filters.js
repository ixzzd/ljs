import React from "react";
import City from "./Filters/City";
import Sex from "./Filters/Sex";

export default class Header extends React.Component {
  render() {
    return (
      <div className="filters">
        <p>City: </p>
        <City />
        <p className='sex'>Sex: </p>
        <Sex />
      </div>
    );
  }
}
