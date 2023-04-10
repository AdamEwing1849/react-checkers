import React from "react";
import { findAllValidClaims, findAllValidMoves } from "../services/game";

function Stats({ currentState, cellsWithPieces }) {
  const { turn, players } = currentState;
  const validClaims = findAllValidClaims(currentState);
  const validMoves = findAllValidMoves(currentState);
  const isGameOver = validClaims.length === 0 && validMoves.length === 0;

  return (
    <div className="stats" data-testid="stats">
      {isGameOver ? (
        <p>
          <span className="game-over">GAME OVER!</span>
        </p>
      ) : (
        <p>
          <span>
            <b>{turn}</b>
          </span>
          <span> turn </span>
        </p>
      )}

      {players.map((player) => (
        <p key={player}>
          <span>{player}: </span>
          <span>{cellsWithPieces[player]}</span>
          <span> pieces left</span>
        </p>
      ))}
    </div>
  );
}

export default Stats;
