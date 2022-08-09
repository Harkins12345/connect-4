import { atom } from "recoil";
import { Board, Player } from "types";

// Local Storage Effect

const localStorageEffect = (key: string) => ({setSelf, onSet}: any) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue : any, _ : any, isReset : boolean) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

// Game State

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
  effects: [
    localStorageEffect('playerState'),
  ]
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: true,
  effects: [
    localStorageEffect('gameOverState'),
  ]
});

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(7).fill([]),
  effects: [
    localStorageEffect('boardState'),
  ]
});

// Board Size and winning amount

export const boardCols = atom<number>({
  key: "boardCols",
  default: 7,
  effects: [
    localStorageEffect('boardCols'),
  ]
});

export const boardRows = atom<number>({
  key: "boardRows",
  default: 6,
  effects: [
    localStorageEffect('boardRows'),
  ]
});

export const winningAmount = atom<number>({
  key: "winningAmount",
  default: 4,
  effects: [
    localStorageEffect('winningAmount'),
  ]
});

// Player Colors

export const playerOneColor = atom<string>({
  key: "playerOneColor",
  default: "#f10000",
  effects: [
    localStorageEffect('playerOneColor'),
  ]
});

export const playerTwoColor = atom<string>({
  key: "playerTwoColor",
  default: "#ece100",
  effects: [
    localStorageEffect('playerTwoColor'),
  ]
});

// Player Names

export const playerOneName = atom<string>({
  key: "playerOneName",
  default: "Red",
  effects: [
    localStorageEffect('playerOneName'),
  ]
});

export const playerTwoName = atom<string>({
  key: "playerTwoName",
  default: "Yellow",
  effects: [
    localStorageEffect('playerTwoName'),
  ]
});

// Bot Values - WIP

// export const botName = atom<string>({
//   key: "botName",
//   default: "Roboto",
// });

// export const botColor = atom<string>({
//   key: "botColor",
//   default: "#ece100",
// });