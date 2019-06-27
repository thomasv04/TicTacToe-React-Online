import React, { Component } from "react";

import "./App.css";

import base from "./base";
import Loader from './components/Loader'

import Game from "./components/Game";

export default class App extends Component {
  state = {
    roomName: this.props.match.params.Room,
    room: {
      creationDate: "",
      cross: "",
      circle: "",
      draw: "",
      size: 3, // ""
      game: {
        morpion: {
          gameStart: true, //false
          turn: false,
          board: ""
        }
      }
    },
    
    goToGame: false,
    isLoading: false
  };

  async componentDidMount() {
    const allData = await base.fetch("/", { context: this });

    Object.entries(allData).forEach(element => {
      const calcul = Date.now() - element[1].creationDate;
      if (calcul > 1800000 && element[0] !== this.state.roomName) {
        // 30 minutes
        base.post(`${element[0]}/`, {
          data: {}
        });
      }
    });

    const data = await base.fetch(this.state.roomName, { context: this });
    this.ref = await base.syncState(`/${this.state.roomName}/`, {
      context: this,
      state: "room"
    });

    console.log(Object.keys(data).length)

    if (Object.keys(data).length === 0) {
      await base.post(`${this.state.roomName}/`, {
        data: {
          
          creationDate: Date.now(),
          cross: 0,
          circle: 0,
          draw: 0,
          size: 3,
          game: {
            morpion: {
              gameStart: true, //false
              turn: false,
              board: ""
            }
          }
        }
      });
      this.startGame()
    }

    setTimeout(() =>{ 
      this.setState({isLoading:true})
     }, 200);
    

    
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  updateBoard = (id) => {
    let symbol
    if(this.state.room.game.morpion.turn){
      symbol = 'X'
    }else{
      symbol = 'O'
    }


    this.setState({
      room: {
        game: {
          morpion: {
            turn: !this.state.room.game.morpion.turn,
            board: {
              [id] : symbol
            }
          }
        }
      }
    }, this.isWinner(id,symbol));
  };

  isWinner = (id, symbol) =>{
    const board = this.state.room.game.morpion.board
    board[id] = symbol

    let nbVide = 0
    console.log(board.length)

    for(var i=0; i<board.length;i++){
      if(board[i].toString() === '0'){
        nbVide++
      }
    }

    setTimeout(() =>{ 
      if(board[0].toString() !== '0' && board[0] === board[1] && board[1] === board[2]){
        console.log(board[0])
        this.win(board[0])
      }else if(board[3].toString() !== '0' && board[3] === board[4] && board[4] === board[5]){
        this.win(board[3])
      }else if(board[6].toString() !== '0' && board[6] === board[7] && board[7] === board[8]){
        this.win(board[6])
      }else if(board[0].toString() !== '0' && board[0] === board[3] && board[3] === board[6]){
        this.win(board[0])
      }else if(board[1].toString() !== '0' && board[1] === board[4] && board[4] === board[7]){
        this.win(board[1])
      }else if(board[2].toString() !== '0' && board[2] === board[5] && board[5] === board[8]){
        this.win(board[2])
      }else if(board[0].toString() !== '0' && board[0] === board[4] && board[4] === board[8]){
        this.win(board[0])
      }else if(board[2].toString() !== '0' && board[2] === board[4] && board[4] === board[6]){
        this.win(board[2])
      }else if(nbVide === 0){
        this.win('D')
      }
     }, 200);
    
  }

  win = (symbol) => {
    if(symbol === 'D'){
      alert('Match nul')
    }else{
      alert('Victoire de '+symbol)
    }
    
    this.addPoints(symbol)
    this.startGame()
  }

  addPoints = (symbol) => {
    let symbolName 
    if(symbol === 'X'){
      symbolName = this.state.room.cross
      symbolName = symbolName + 1;
      this.setState({ room: { cross : symbolName } });
    }else if(symbol === 'O'){
      symbolName = this.state.room.circle
      symbolName = symbolName + 1;
      this.setState({ room: { circle : symbolName } });
    }else if(symbol === 'D'){
      symbolName = this.state.room.draw
      symbolName = symbolName + 1;
      this.setState({ room: { draw : symbolName } });
    }
    
    
  };

  handleChangeSize = e => {
    const size = e.target.value;
    this.setState({ room: { size } });
  };

  startGame = () => {
    const test = [];
    for (var i = 0; i < this.state.room.size * this.state.room.size; i++) {
      test.push(0);
    }

    this.setState({
      room: {
        game: {
          morpion: {
            gameStart: true,
            board: test
          }
        }
      }
    });
  };

  render() {

    if(!this.state.isLoading){
      return <Loader/>
    }
    
    let module;
      module = (
        <Game
          type={this.props.match.params.Game}
          turn={this.state.room.game.morpion.turn}
          updateBoard={this.updateBoard}
          board={this.state.room.game.morpion.board}
          roomName={this.props.match.params.Room}
          circle={this.state.room.circle}
          cross={this.state.room.cross}
          size={this.state.room.size}
          draw={this.state.room.draw}
          updateSize={this.handleChangeSize}
        />
      );

    return <div className="App">{module}</div>;
  }
}
