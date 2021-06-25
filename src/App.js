import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';
let tieCounter = 0;

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setPlayer] = useState(PLAYER_1);
  let gameOver = false;
  

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const updateTheSquare = (id) => {
    if (gameOver){
      return false;
    }
    const tempSquares = [];
    let currentId = 0;
    let changePlayer = false;
    for (let row = 0; row < 3; row += 1) {
      tempSquares.push([]);
      for (let col = 0; col < 3; col += 1) {
        let squareVal = squares[row][col].value;
        if (currentId === id && (squares[row][col].value === '')){
          squareVal=currentPlayer;
          tieCounter += 1;
          console.log('Mi contador: ',tieCounter);
          changePlayer = true;
        }
        tempSquares[row].push({
          id: currentId,
          value: squareVal,
        });
        currentId += 1;
      }
    }
    setSquares(tempSquares);
    if (changePlayer && (currentPlayer === PLAYER_1)){
      setPlayer(PLAYER_2);
    }
    else if (changePlayer && (currentPlayer === PLAYER_2)){
      setPlayer(PLAYER_1);
    }
    
  }


  const checkForWinner = () => {
    for (let idx=0; idx<3; idx++){
      //Columns
      if (squares[0][idx].value !== '' && 
          squares[0][idx].value === squares[1][idx].value && squares[1][idx].value === squares[2][idx].value){
            gameOver = true;
            return (`Winner is ${squares[0][idx].value}`)
          }
      //Rows
      if (squares[idx][0].value !== '' && 
          squares[idx][0].value === squares[idx][1].value && squares[idx][1].value === squares[idx][2].value){
            gameOver = true;
            return (`Winner is ${squares[idx][0].value}`)
          }
    }
    //Diagonals
    if (squares[1][1].value !== ''){ 
      if (squares[0][0].value === squares[1][1].value && squares[1][1].value === squares[2][2].value){
        gameOver = true;
        return (`Winner is ${squares[0][0].value}`);
      }
      else if (squares[0][2].value === squares[1][1].value && squares[1][1].value === squares[2][0].value){
            gameOver = true;
            return (`Winner is ${squares[0][2].value}`);
      }
    }
    //Tie
    if (tieCounter === 9){
      return ('GATO!😸 The game ends in a tie.')
    }
    return (`Current player is ${currentPlayer}`);
  }


  const resetGame = () => {
    // Complete in Wave 4
    const clearSquares = generateSquares();
    setSquares(clearSquares);
    tieCounter = 0;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{checkForWinner()}</h2>
        <button onClick={resetGame} className="ResetButton">Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={updateTheSquare}/>
      </main>
    </div>
  );
}

export default App;
