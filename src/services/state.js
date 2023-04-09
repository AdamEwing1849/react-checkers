import {
  STORAGE_KEY,
  PREV_STORAGE_KEY,
  HUMAN_PLAYER,
  COMPUTER_PLAYER,
} from "./constants";

const initialState = {
  turn: HUMAN_PLAYER,
  players: [COMPUTER_PLAYER, HUMAN_PLAYER],
  board: [
    [
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
    ],
    [
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
      { piece: COMPUTER_PLAYER },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
    ],
    [
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
      { piece: null },
      { piece: HUMAN_PLAYER },
    ],
  ],
};

const getStoredItem = (key) => {
  let storedState = null;

  try {
    storedState = JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log("Error occurred trying to get stored state");
  }

  return storedState;
};

const get = () => {
  return getStoredItem(STORAGE_KEY) || initialState;
};

const set = (newState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
};

const setPrevious = (prevState) => {
  localStorage.setItem(PREV_STORAGE_KEY, JSON.stringify(prevState));
};

const getPrevious = () => {
  return getStoredItem(PREV_STORAGE_KEY);
};

const clearPrevious = () => {
  localStorage.removeItem(PREV_STORAGE_KEY);
};

const clearAll = () => {
  set(initialState);
  localStorage.removeItem(PREV_STORAGE_KEY);
};

export const getCellsWithPieces = (currentState) => {
  const { board, players } = currentState;

  return board.reduce(
    (acc, row) => {
      row.forEach((cell) => {
        if (!cell.piece) {
          return;
        }

        acc[cell.piece] += 1;
      });

      return acc;
    },
    players.reduce((acc, item) => {
      acc[item] = 0;

      return acc;
    }, {})
  );
};

const state = {
  get,
  set,
  setPrevious,
  getPrevious,
  clearPrevious,
  clearAll,
  getCellsWithPieces,
};

export default state;
