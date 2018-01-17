import React from "react";
import Title from "./Header/Title";
import Tools from "./Header/Tools";
import Cities from "./Header/Cities";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <Title />
        <Cities />
        <Tools />
      </nav>
    );
  }
}
