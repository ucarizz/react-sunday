import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    turn: "X",
    gameStatus: false,
    board: Array(9).fill(""),
    movingCount: 0,
    winning: "",
  };

  handleClick(event) {
    if (this.state.gameStatus===true) {
      return
    }
    if (this.state.board[event.target.dataset.square] === "") {
      this.state.board[event.target.dataset.square] = this.state.turn;

      event.target.innerText = this.state.turn;
      this.setState({
        turn: this.state.turn === "X" ? "O" : "X",
        board: this.state.board,
        movingCount: ++this.state.movingCount,
      });

    }

    var result = this.control();
    if (result === "X") {
      this.setState({
        gameStatus: true,
        winning: "X",
      });
    } else if (result === "O") {
      this.setState({
        gameStatus: true,
        winning: "O",
      });
    } else if(this.state.movingCount === 9){
      this.setState({
        gameStatus: true,
        winning: "Scoreless",
      });
    }
    
  }
  control() {
    var board = this.state.board;
    var winningRules = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    for (let i = 0; i < winningRules.length; i++) {
      if (
        board[winningRules[i][0]] === board[winningRules[i][1]] &&
        board[winningRules[i][1]] === board[winningRules[i][2]]
      ) {
        return board[winningRules[i][0]];
      }
      if (this.state.movingCount === 9) {
        return "Scoreless";
      }
    }
  }
  render() {
    return (
      <div className="App">
        <div id="game">
        <div id="state">{this.state.winning}</div>
          <div id="head"> Tic Tac Toe</div>
          <div id="board" onClick={(e) => this.handleClick(e)}>
            <div className="square" data-square="0"></div>
            <div className="square" data-square="1"></div>
            <div className="square" data-square="2"></div>
            <div className="square" data-square="3"></div>
            <div className="square" data-square="4"></div>
            <div className="square" data-square="5"></div>
            <div className="square" data-square="6"></div>
            <div className="square" data-square="7"></div>
            <div className="square" data-square="8"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
