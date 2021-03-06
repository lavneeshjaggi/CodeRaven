import React from "react";
import { ReactComponent as Logo } from "../../assets/coding.svg";

import "./header.styles.scss";

const Header = ({ history }) => (
  <div className="header">
    <Logo className="logo" />
    <h1>CODE RAVEN</h1>
  </div>
);

export default Header;
