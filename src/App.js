import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

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
    let tieCounter = 0;
    // console.log('Esto es lo que recibo en checkForWinner: ',squares);
    // 1. Go accross each row and go down each column, to see if 3 squares in the same row match same value
    for (let row = 0; row < 3; row += 1) {
      let countRowX = 0;
      let countRowO = 0;
      let countColX = 0;
      let countColO = 0;
      for (let col = 0; col < 3; col += 1) {
        // Rows
        if (squares[row][col].value === 'X'){
          countRowX += 1;
          tieCounter += 1;
        }
        else if (squares[row][col].value === 'O'){
          countRowO += 1;
          tieCounter += 1;
        }
        // Columns
        if (squares[col][row].value === 'X'){
          countColX += 1;
        }
        else if (squares[col][row].value === 'O'){
          countColO += 1;
        }
      }
      if (countRowX === 3 || countColX === 3){
        gameOver = true;
        return ('Winner is X');
      }
      else if (countRowO === 3 || countColO === 3){
        gameOver = true;
        return ('Winner is O');
      }
    }

    // 2. Go across each diagonal to see if all three squares have the same value.
    let diagonalX = 0;
    let diagonalO = 0;
    let inverseDiagonalX = 0;
    let inverseDiagonalO = 0;
    const inverseIdx = 2;
    for (let idx = 0; idx < 3; idx += 1) {
      // Diagonal
      if (squares[idx][idx].value === 'X'){
        diagonalX += 1;
      }
      else if (squares[idx][idx].value === 'O'){
        diagonalO += 1;
      }
      // Inverse Diagonal
      if (squares[inverseIdx-idx][idx].value === 'X'){
        inverseDiagonalX += 1;
      }
      else if (squares[inverseIdx-idx][idx].value === 'O'){
        inverseDiagonalO += 1;
      }
    }
    if (diagonalX === 3 || inverseDiagonalX === 3){
      gameOver = true;
      return ('Winner is X');
    }
    else if (diagonalO === 3 || inverseDiagonalO === 3){
      gameOver = true;
      return ('Winner is O');
    }
    if (tieCounter === 9){
      return ('The game ends in a tie');
    }
    return (`Current player is ${currentPlayer}`)

  }

  const resetGame = () => {
    // Complete in Wave 4
    const clearSquares = generateSquares();
    setSquares(clearSquares);
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
