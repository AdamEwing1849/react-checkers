import React from "react";
import Piece from "./Piece";
import {
  HUMAN_PLAYER,
  COMPUTER_PLAYER,
  CELL_CLASS_NAME,
} from "../services/constants";

const Cell = ({
  cell,
  cellIndex,
  rowIndex,
  isCurrentPieceDragged,
  currentState,
}) => {
  return (
    <div
      className={`${CELL_CLASS_NAME} ${
        (cellIndex + rowIndex) % 2 ? HUMAN_PLAYER : COMPUTER_PLAYER
      }`}
      data-row={rowIndex}
      data-col={cellIndex}
    >
      {cell.piece && (
        <Piece
          piece={cell.piece}
          isCurrentPieceDragged={isCurrentPieceDragged}
          currentState={currentState}
        />
      )}
    </div>
  );
};

export default Cell;
