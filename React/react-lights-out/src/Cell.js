import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ x, y, flipCellsAroundMe, isLit }) {
  const classes = `${isLit ? "on" : "off"}`;
  return <td className={classes} onClick={() => flipCellsAroundMe(`${y}-${x}`)} x={x} y={y}>{classes}</td>;
}

export default Cell;
