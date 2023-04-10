import { COMPUTER_PLAYER } from "./constants";

const getPosition = (el) => {
  return { row: Number(el.dataset.row), col: Number(el.dataset.col) };
};

const getRandomInRange = (start, end) =>
  Math.floor(Math.random() * end) + start;

const getNextPlayer = ({ players, turn }) => {
  let nextPlayerIndex = players.indexOf(turn) + 1;

  if (nextPlayerIndex >= players.length) nextPlayerIndex = 0;

  return players[nextPlayerIndex];
};

const isValidMove = (
  { row: fR, col: fC },
  { row: tR, col: tC },
  { board, turn }
) => {
  // Normal 1-length diagonal move
  const allowedMoveLength = board[fR][fC].isKing
    ? [-1, 1]
    : [turn === COMPUTER_PLAYER ? 1 : -1];

  if (
    board[fR][fC].piece === turn && // Piece belongs to current player
    allowedMoveLength.includes(tR - fR) && // First part of 1-length diagonal check (-1 or +1 depending on player)
    Math.abs(tC - fC) === 1 && // Second part of 1-length diagonal check
    !board[tR][tC].piece // Check if a cell is NOT occupied
  ) {
    return true;
  }

  return false;
};

const isValidClaim = (
  { row: fR, col: fC },
  { row: tR, col: tC },
  { board, turn }
) => {
  // 2-length diagonal claiming move
  if (
    board[fR][fC].piece === turn && // Piece belongs to current player
    Math.abs(fR - tR) === 2 && // First part of 2-length diagonal check
    Math.abs(fC - tC) === 2 && // Second part of 2-length diagonal check
    !board[tR][tC].piece && // Check if a cell is occupied
    board[(fR + tR) / 2][(fC + tC) / 2].piece !== turn && // Check if middle cell is NOT occupied by current player
    board[(fR + tR) / 2][(fC + tC) / 2].piece // Check if middle cell is occupied
  ) {
    return true;
  }

  return false;
};

export const findValidMoves = (from, { board, turn }) => {
  if (from instanceof HTMLElement) {
    from = getPosition(from);
  }

  const validMoves = [];

  for (let [rowIndex, row] of board.entries()) {
    for (let [colIndex] of row.entries()) {
      let to = { row: rowIndex, col: colIndex };

      if (isValidMove(from, to, { board, turn })) {
        validMoves.push(to);
      }
    }
  }

  return validMoves;
};

export const findValidClaims = (from, { board, turn }) => {
  if (from instanceof HTMLElement) {
    from = getPosition(from);
  }

  const validClaims = [];

  for (let [rowIndex, row] of board.entries()) {
    for (let [colIndex] of row.entries()) {
      let to = { row: rowIndex, col: colIndex };

      if (isValidClaim(from, to, { board, turn })) {
        validClaims.push(to);
      }
    }
  }

  return validClaims;
};

export const findAllValidMoves = ({ board, turn }) => {
  const validMoves = [];

  for (let [rowIndex, row] of board.entries()) {
    for (let [colIndex] of row.entries()) {
      let validMove = findValidMoves(
        { row: rowIndex, col: colIndex },
        { board, turn }
      );

      if (validMove.length > 0) {
        validMoves.push({ row: rowIndex, col: colIndex });
      }
    }
  }

  return validMoves;
};

export const findAllValidClaims = ({ board, turn }) => {
  const validMoves = [];

  for (let [rowIndex, row] of board.entries()) {
    for (let [colIndex] of row.entries()) {
      let validMove = findValidClaims(
        { row: rowIndex, col: colIndex },
        { board, turn }
      );

      if (validMove.length > 0) {
        validMoves.push({ row: rowIndex, col: colIndex });
      }
    }
  }

  return validMoves;
};

const checkIsNewKing = (position, turn) => {
  return turn === COMPUTER_PLAYER ? position.row === 7 : position.row === 0;
};

const movePiece = (from, to, currentState, onSuccess) => {
  const fromPos = from.hasOwnProperty("row") ? from : getPosition(from);
  const toPos = to.hasOwnProperty("row") ? to : getPosition(to);
  const { piece, isKing } = currentState.board[fromPos.row][fromPos.col];
  const isNewKing = checkIsNewKing(toPos, currentState.turn);
  const newBoard = currentState.board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      if (rowIndex === fromPos.row && cellIndex === fromPos.col) {
        return { ...cell, piece: null };
      } else if (rowIndex === toPos.row && cellIndex === toPos.col) {
        return { ...cell, piece, isKing: isKing || isNewKing };
      } else {
        return cell;
      }
    });
  });

  onSuccess({
    ...currentState,
    board: [...newBoard],
    turn: getNextPlayer(currentState),
  });
};

const moveAndRemovePiece = (from, to, currentState, onSuccess) => {
  const fromPos = from.hasOwnProperty("row") ? from : getPosition(from);
  const toPos = to.hasOwnProperty("row") ? to : getPosition(to);
  const { piece, isKing } = currentState.board[fromPos.row][fromPos.col];
  const isNewKing = checkIsNewKing(toPos, currentState.turn);
  const middlePos = {
    row: (fromPos.row + toPos.row) / 2,
    col: (fromPos.col + toPos.col) / 2,
  };
  const newBoard = currentState.board.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      if (rowIndex === fromPos.row && cellIndex === fromPos.col) {
        return { ...cell, piece: null };
      } else if (rowIndex === toPos.row && cellIndex === toPos.col) {
        return { ...cell, piece, isKing: isKing || isNewKing };
      } else if (rowIndex === middlePos.row && cellIndex === middlePos.col) {
        return { ...cell, piece: null };
      } else {
        return cell;
      }
    });
  });

  onSuccess({
    ...currentState,
    board: [...newBoard],
    turn: getNextPlayer(currentState),
  });
};

export const tryMakeClaim = ({ from, to, currentState, onSuccess }) => {
  if (isValidClaim(getPosition(from), getPosition(to), currentState)) {
    moveAndRemovePiece(from, to, currentState, onSuccess);
  }
};

export const tryMakeMove = ({ from, to, currentState, onSuccess }) => {
  if (isValidMove(getPosition(from), getPosition(to), currentState)) {
    movePiece(from, to, currentState, onSuccess);
  }
};

export const makeComputerTurn = (currentState, setCurrentState) => {
  const allValidClaims = findAllValidClaims(currentState);
  const allValidMoves = findAllValidMoves(currentState);

  if (allValidClaims.length) {
    const from = allValidClaims[getRandomInRange(0, allValidClaims.length - 1)];
    const claims = findValidClaims(from, currentState);
    const to = claims[getRandomInRange(0, claims.length - 1)];

    moveAndRemovePiece(from, to, currentState, setCurrentState);

    return;
  }

  if (allValidMoves.length) {
    const from = allValidMoves[getRandomInRange(0, allValidMoves.length - 1)];
    const moves = findValidMoves(from, currentState);
    const to = moves[getRandomInRange(0, moves.length - 1)];

    movePiece(from, to, currentState, setCurrentState);
  }
};

export const isPlayerTurn = (el, { turn, board }) => {
  const { row, col } = getPosition(el);

  return board[row][col].piece === turn;
};

const game = {
  findValidClaims,
  findValidMoves,
  findAllValidClaims,
  findAllValidMoves,
  tryMakeClaim,
  tryMakeMove,
  makeComputerTurn,
  isPlayerTurn,
};

export default game;
