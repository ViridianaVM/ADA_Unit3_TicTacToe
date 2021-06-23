import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  
  console.log('My squares inputs: ', squares);
  console.log('My onClickCallBack inputs: ', onClickCallback);

  let squaresOneDimension = [];
  for (let idx=0; idx<squares.length; idx++){
    squaresOneDimension = squaresOneDimension.concat(squares[idx]);
  }

  const squareComponents = squaresOneDimension.map((square) => {
    return (
      <Square key={square.id}
      id={square.id}
      value={square.value}
      onClickCallback={square.onClickCallback}
      />
    );
  });

  return squareComponents;
}


  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components



const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log('This is the square list',squareList);
  return <div className="grid" >
    {squareList}
  </div>
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
