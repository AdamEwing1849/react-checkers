import React, { useState } from "react";
import Stats from "./Stats";
import Board from "./Board";
import Controls from "./Controls";
import constants from "../services/constants";
import state from "../services/state";

function App() {
  const [currentState, setCurrentState] = useState(state.get());
  const hasPrevState = !!state.getPrevious();

  const setAndSaveState = (newState) => {
    if (currentState.turn === constants.HUMAN_PLAYER) {
      state.setPrevious(currentState);
    }

    state.set(newState);
    setCurrentState(newState);
  };

  const startNewGame = () => {
    state.clearAll();
    setCurrentState(state.get());
  };

  const undoLastMove = () => {
    setAndSaveState(state.getPrevious());
    state.clearPrevious();
  };

  return (
    <>
      <Stats
        currentState={currentState}
        cellsWithPieces={state.getCellsWithPieces(currentState)}
      />
      <Controls
        startNewGame={startNewGame}
        undoLastMove={undoLastMove}
        hasPrevState={hasPrevState}
      />
      <Board currentState={currentState} setCurrentState={setAndSaveState} />
    </>
  );
}

export default App;
