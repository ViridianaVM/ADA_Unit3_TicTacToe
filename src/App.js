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
  
    const pos00 = squares[0][0].value;
    const pos01 = squares[0][1].value;
    const pos02 = squares[0][2].value;
    const pos10 = squares[1][0].value;
    const pos11 = squares[1][1].value;
    const pos12 = squares[1][2].value;
    const pos20 = squares[2][0].value;
    const pos21 = squares[2][1].value;
    const pos22 = squares[2][2].value;

    //Rows
    if  (pos00 !== '' && pos00 === pos01 && pos01 === pos02){
      gameOver = true;
      return (`Winner is ${pos00}`);
    }
    else if (pos10 !== '' && pos10 === pos11 && pos11 === pos12){
      gameOver = true;
      return (`Winner is ${pos10}`);
    }
    else if (pos20 !== '' && pos20 === pos21 && pos21 === pos22){
      gameOver = true;
      return (`Winner is ${pos20}`);
    }

    //Columns
    if  (pos00 !== '' && pos00 === pos10 && pos10 === pos20){
      gameOver = true;
      return (`Winner is ${pos00}`);
    }
    else if (pos01 !== '' && pos01 === pos11 && pos11 === pos21){
      gameOver = true;
      return (`Winner is ${pos01}`);
    }
    else if (pos02 !== '' && pos02 === pos12 && pos12 === pos22){
      gameOver = true;
      return (`Winner is ${pos02}`);
    }

    //Diagonals
    if  (pos00 !== '' && pos00 === pos11 && pos11 === pos22){
      gameOver = true;
      return (`Winner is ${pos00}`);
    }
    else if (pos02 !== '' && pos02 === pos11 && pos11 === pos20){
      gameOver = true;
      return (`Winner is ${pos02}`);
    }

    if (tieCounter === 9){
      return ('The game ends in a tie')
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
