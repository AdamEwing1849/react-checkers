import {
  CELL_CLASS_NAME,
  CELL_VALID_CLAIM,
  CELL_VALID_MOVE,
  CELL_AVAILABLE_CLAIM,
} from "./constants";

export const clearAllValidCells = () => {
  document.querySelectorAll(`.${CELL_CLASS_NAME}`).forEach((el) => {
    el.classList.remove(CELL_VALID_MOVE);
    el.classList.remove(CELL_VALID_CLAIM);
    el.classList.remove(CELL_AVAILABLE_CLAIM);
  });
};

export const highlightValidClaimCells = (validClaims) => {
  validClaims.forEach((pos) => {
    document
      .querySelector(
        `.${CELL_CLASS_NAME}[data-row="${pos.row}"][data-col="${pos.col}"]`
      )
      .classList.add(CELL_VALID_CLAIM);
  });
};

export const highlightAllAvailableClaimCells = (allAvailableClaims) => {
  allAvailableClaims.forEach((pos) => {
    document
      .querySelector(
        `.${CELL_CLASS_NAME}[data-row="${pos.row}"][data-col="${pos.col}"]`
      )
      .classList.add(CELL_AVAILABLE_CLAIM);
  });
};

export const highlightValidMoveCells = (validMoves) => {
  validMoves.forEach((pos) => {
    document
      .querySelector(
        `.${CELL_CLASS_NAME}[data-row="${pos.row}"][data-col="${pos.col}"]`
      )
      .classList.add(CELL_VALID_MOVE);
  });
};
