import React from "react";
import Title from "./Header/Title";
import Tools from "./Header/Tools";

export default class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <Title />
        <Tools />
      </nav>
    );
  }
}
