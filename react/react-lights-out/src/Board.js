import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  function isLightOn(){
    if((Math.floor(Math.random() * 100 + 1)) < chanceLightStartsOn){
      return false
    } return true
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // TODO: create array-of-arrays of true/false values
    for(let i = 0; i < nrows; i++){
      initialBoard.push([])
      for(let j = 0; j < ncols; j++){
        initialBoard[i].push(isLightOn())
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // board.map(e => e.map(e2 => e.isLit = false ? false : ) : )
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {

        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      // check all cells around the clicked cell
      flipCell(y, x, deepCopy)
      flipCell(y, x - 1, deepCopy)
      flipCell(y, x + 1, deepCopy)
      flipCell(y - 1, x, deepCopy)
      flipCell(y + 1, x, deepCopy)

      // TODO: return the copy
      return deepCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

    if(hasWon()){ 
      return "you win!" 
    }
    return (
      <table>
      <tbody>
        {board.map((row, i) => 
          <tr> 
            {row.map((col, j) => 
                <Cell 
                  key = {`${j}, ${i}`}
                  x = {j}
                  y = {i}
                  isLit={col === true ? true : false} 
                  flipCellsAroundMe={flipCellsAround}
                />
              )
            }
          </tr>
        )}
      </tbody>
    </table>
    )
}

export default Board;
