import { useRecoilState, useRecoilValue } from "recoil";
import { boardState, boardRows, gameOverState, playerState, winningAmount } from "state";

const testWin = (arr: number[], RE:RegExp): boolean => RE.test(arr.join(""));

/**
  * Returns a diagonal array from the last played piece, if one is present in the game board
  * @param xPos - X axis value of the last played piece
  * @param yPos - Y axis value of the last played piece
  * @param board - Nested number arrays making up the new board
  * @param yAxisFlip - Set true (default) for the pointer to traverse up the board, false to traverse down
  */
const getDiagonalArray = (xPos: number, yPos: number, board: number[][], wAmount: number, yAxisFlip: boolean = true): number[] => {
  
  // Set X axis pointer (winning amount -1) places before the last played move
  // Depending on which direction (up or down) you want the array to
  // go "yAxisFlip" will be true or false (default true)

  const pointer = {
    x: xPos - (wAmount-1),
    y: yAxisFlip ? yPos - (wAmount-1) : yPos + (wAmount-1)
  }

  const diagonalArray: number[] = []

  // The pointer will scan the amount you need to win - 1
  // Diagonally before and after the last played position
  for (let i: number = 0; i <= (wAmount-1) * 2; i++){
    // If the current coordinates are undefined they must be beyond the borders
    // Or the move has not been made yet
    if (board[pointer.x] &&
        board[pointer.x][pointer.y]){

          // Add valid position to diagonal array
          diagonalArray.push(board[pointer.x][pointer.y])
    }

    // Move the pointer to next diagonal
    // Up if "yAxisFlip" is true, down if false
    pointer.y = yAxisFlip ? pointer.y + 1 : pointer.y - 1
    pointer.x++
  }
  
  return diagonalArray
}

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);
  const boardRowsValue = useRecoilValue(boardRows);
  const winningAmountValue = useRecoilValue(winningAmount);

  const winRE = new RegExp(`1{${winningAmountValue}}|2{${winningAmountValue}}`)

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRowsValue) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;


    if (
      testWin(newBoard[col], winRE) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0), winRE) ||// Did win horizontally
      testWin(getDiagonalArray(col, row, newBoard, winningAmountValue), winRE) ||
      testWin(getDiagonalArray(col, row, newBoard, winningAmountValue, false), winRE)// Did win diagonally
    ) {
      setGameOver(true);
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard((oldBoard) => [...newBoard]);
  };
};

export default usePlayPiece;
