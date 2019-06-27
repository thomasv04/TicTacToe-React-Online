import React, { Component } from "react";

import PointCounter from "./PointCounter";
import Cell from "./Cell";


import "./Game.css";

import circle from "../img/circle.svg";
import cross from "../img/cross.svg";
import balance from "../img/balance.svg";

export default class Game extends Component {
  state = {
    boardTab: []
  };

  render() {



    const board = this.props.board
    let morpion = [];
    let pourcentageSize = {
      "--pourcentageSize": parseFloat(100 / this.props.size) + "%"
    };

    if(board !== undefined){
      morpion = Object.values(board).map((item, id) => {
        return <Cell
         key={id}
         id={id}
         value={item}
         updateBoard={this.props.updateBoard}
         circle={circle}
         cross={cross}
         ></Cell>
      })

    }

    return (
      <div className="game">
        <div className="score_flex">
          <div className="score">
            <PointCounter
              type="circle"
              points={this.props.circle}
              image={circle}
            />
            <PointCounter
              type="cross"
              points={this.props.cross}
              image={cross}
            />
            <PointCounter
              type="draw"
              points={this.props.draw}
              image={balance}
            />
          </div>
        </div>

        <div className="board" style={pourcentageSize}>
          {morpion}
        </div>

        <div className="turn">
          <div className="item">
            <div className={this.props.turn ? "cross active" : "cross"}>
              <img src={cross} alt="" />
            </div>
            <div className={!this.props.turn ? "circle active" : "circle"}>
              <img src={circle} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
