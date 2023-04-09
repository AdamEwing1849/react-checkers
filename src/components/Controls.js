import React from "react";

function Controls({ startNewGame, undoLastMove, hasPrevState }) {
  return (
    <div className="controls">
      <button onClick={startNewGame}>Start new game</button>
      {hasPrevState && <button onClick={undoLastMove}>Undo last move</button>}
    </div>
  );
}

export default Controls;
