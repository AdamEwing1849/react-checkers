import React, { useEffect, useState } from "react";
import {
  PIECE_CLASS_NAME,
  CELL_CLASS_NAME,
  COMPUTER_PLAYER,
  COMPUTER_TURN_DELAY,
} from "../services/constants";
import { dragElement, onDragEnd } from "../services/dragAndDrop";
import {
  findAllValidClaims,
  isPlayerTurn,
  tryMakeClaim,
  tryMakeMove,
  makeComputerTurn,
} from "../services/game";
import { clearAllValidCells } from "../services/hints";
import Cell from "./Cell";

function Board({ currentState, setCurrentState }) {
  const [draggedElement, setDraggedElement] = useState(null);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [dragShift, setDragShift] = useState(null);

  const isPieceTarget = (target) => target.classList.contains(PIECE_CLASS_NAME);
  const isCellTarget = (target) => target.classList.contains(CELL_CLASS_NAME);
  const isCurrentPieceDragged = (target) => draggedElement === target;

  const onMouseDown = (e) => {
    e.preventDefault();

    const { target } = e;
    const isDraggedSet = draggedElement !== null;
    const isTargetDragged = draggedElement === target;

    if (
      isPieceTarget(target) &&
      isPlayerTurn(target.parentNode, currentState) &&
      (!isDraggedSet || isTargetDragged)
    ) {
      setDraggedElement(target);
    }
  };

  const onMouseMove = (e) => {
    dragElement(e, draggedElement, mousePosition, dragShift, setDragShift);
    setMousePosition([e.pageX, e.pageY]);
  };

  const onMouseUp = (e) => {
    clearAllValidCells();
    onDragEnd(draggedElement);

    if (draggedElement && isCellTarget(e.target)) {
      const options = {
        from: draggedElement.parentNode,
        to: e.target,
        currentState,
        onSuccess: (newState) => {
          setCurrentState(newState);
        },
      };

      findAllValidClaims(currentState).length > 0
        ? tryMakeClaim(options)
        : tryMakeMove(options);
    }

    setDraggedElement(null);
    setDragShift(null);
  };

  useEffect(() => {
    if (currentState.turn === COMPUTER_PLAYER) {
      const timerId = setTimeout(() => {
        clearAllValidCells();
        makeComputerTurn(currentState, setCurrentState);
      }, COMPUTER_TURN_DELAY);

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState.turn]);

  return (
    <div
      className="board"
      data-testid="board"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {currentState.board.map((row, rowIndex) => {
        return row.map((currentCell, cellIndex) => (
          <Cell
            key={`${cellIndex}:${rowIndex}`}
            currentState={currentState}
            rowIndex={rowIndex}
            cellIndex={cellIndex}
            cell={currentCell}
            isCurrentPieceDragged={isCurrentPieceDragged}
          />
        ));
      })}
    </div>
  );
}

export default Board;
