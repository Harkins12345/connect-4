import { atom } from "recoil";
import { Board, Player } from "types";

// Game State

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: true,
});

export const winner = atom<number>({
  key: "winner",
  default: 1,
});

// Board Size and winning amount

export const boardCols = atom<number>({
  key: "boardCols",
  default: 7,
});

export const boardRows = atom<number>({
  key: "boardRows",
  default: 6,
});

export const winningAmount = atom<number>({
  key: "winningAmount",
  default: 4,
});

// Player Colors

export const playerOneColor = atom<string>({
  key: "playerOneColor",
  default: "#f10000",
});

export const playerTwoColor = atom<string>({
  key: "playerTwoColor",
  default: "#ece100",
});

// Player Names

export const playerOneName = atom<string>({
  key: "playerOneName",
  default: "Red",
});

export const playerTwoName = atom<string>({
  key: "playerTwoName",
  default: "Yellow",
});

// Bot Values

export const botName = atom<string>({
  key: "botName",
  default: "Roboto",
});

export const botColor = atom<string>({
  key: "botColor",
  default: "#ece100",
});

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(7).fill([]),
});