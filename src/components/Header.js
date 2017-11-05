import React from "react";
import Title from "./Header/Title";
import Sex from "./Header/Sex";
import Tools from "./Header/Tools";
import Cities from "./Header/Cities";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <Title />
        <Sex />
        <Cities />
        <Tools />
      </nav>
    );
  }
}
