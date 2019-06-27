import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./Room.css";

import base from "../base";

export default class Room extends Component {
  state = {
    roomNum: "",
    goToApp: false,
    listRoom: ""
  };

  async componentDidMount() {
    const data = await base.fetch("/", { context: this });
    const listRoom = Object.keys(data);
    this.setState({ listRoom });
  }

  handleChange = e => {
    const roomNum = e.target.value;
    this.setState({ roomNum });
  };

  generateNumRoom = () => {
    const roomNum = Date.now();
    this.setState({ roomNum }, () => {
      this.joinRoom();
    });
  };

  joinRoom = (isCreate, data) => {
    if (this.state.roomNum === "" && !isCreate) {
      this.generateNumRoom();
    } else if (isCreate) {
      console.log(isCreate)
      this.setState({
        roomNum: data || this.state.roomNum,
        goToApp: true
      });
    } else {
      
      this.setState({ goToApp: true });
    }
  };

  render() {
    if (this.state.goToApp) {
      return <Redirect push to={`/Room/${this.state.roomNum}/`} />;
    }

    let listRoom = Object.values(this.state.listRoom).map((item, id) => {
      return (
        <div key={id} className="roomItem">
          <p>{item}</p>
          <div
            className="join"
            onClick={() => {
              this.joinRoom(true, item);
            }}
          >
            Rejoindre
          </div>
        </div>
      );
    });

    return (
      <div className="room">
        <div className="roomList">
          {listRoom}
          <form>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.roomNum}
              placeholder="Nom de la salle ..."
            />
            <div className="button">
              <button onClick={() => {this.joinRoom(false)}}>
                Créer la salle
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
