import React from "react";
import {
  findAllValidClaims,
  findValidClaims,
  findValidMoves,
} from "../services/game";
import {
  highlightValidClaimCells,
  highlightValidMoveCells,
  clearAllValidCells,
  highlightAllAvailableClaimCells,
} from "../services/hints";
import { PIECE_CLASS_NAME, KING_CLASS_NAME } from "../services/constants";

function Piece({ piece, isKing, isCurrentPieceDragged, currentState }) {
  const onMouseOver = (event) => {
    const el = event.target.parentNode;
    const allValidClaims = findAllValidClaims(currentState);

    if (allValidClaims.length > 0) {
      const validClaims = findValidClaims(el, currentState);

      if (validClaims.length > 0) {
        highlightValidClaimCells(validClaims);
      } else {
        highlightAllAvailableClaimCells(allValidClaims);
      }
    } else {
      const validMoves = findValidMoves(el, currentState);

      highlightValidMoveCells(validMoves);
    }
  };

  const onMouseLeave = (e) =>
    !isCurrentPieceDragged(e.target) && clearAllValidCells();

  return (
    <div
      className={`${PIECE_CLASS_NAME} ${PIECE_CLASS_NAME}-${
        piece ? piece : ""
      } ${isKing ? KING_CLASS_NAME : ""}`}
      onMouseEnter={onMouseOver}
      onMouseOver={onMouseOver}
      onMouseMove={onMouseOver}
      onMouseOut={onMouseLeave}
      onMouseLeave={onMouseLeave}
    ></div>
  );
}

export default Piece;
