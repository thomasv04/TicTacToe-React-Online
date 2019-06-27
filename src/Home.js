import React, { Component } from "react";
import iconMorpion from "./img/icon_morpion.png";
import { Redirect } from "react-router-dom";

import "./Home.css";

export default class Home extends Component {
  state = {
    goToGame: false
  };

  handleClick = () => {
    this.setState({ goToGame: true });
  };

  render() {
    if (this.state.goToGame) {
      return (
        <Redirect push to={`/Room/${this.props.match.params.Room}/morpion`} />
      );
    }

    return (
      <div className="home">
        <div onClick={this.handleClick} className="gameItem morpion">
          <img src={iconMorpion} alt="" />
        </div>
      </div>
    );
  }
}
