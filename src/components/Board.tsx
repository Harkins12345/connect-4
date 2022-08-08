import { Circle, Flex } from "@chakra-ui/react";
import { usePlayPiece } from "hooks";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { boardState, gameOverState, playerState, boardRows, playerOneColor, playerTwoColor } from "state";
import { Player } from "types";

const Board: FC = () => {
  const play = usePlayPiece();
  const board = useRecoilValue(boardState);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const rows = useRecoilValue(boardRows)

  const playerOneColorState = useRecoilValue(playerOneColor);
  const playerTwoColorState = useRecoilValue(playerTwoColor);

  const playerColor = {
    1: playerOneColorState,
    2: playerTwoColorState
  }

  const padCol = (col: number[]): number[] =>
    col.join("").padEnd(rows, "0").split("").map(Number);

  return (
    <Flex justify="center">
      {board.map((col, i) => (
        <Flex
          key={i}
          role="group"
          onClick={() => play(i)}
          flexDirection="column-reverse"
          cursor={gameOver ? "auto" : "pointer"}
        >
          {padCol(col).map((p, j) => (
            <Circle
              m={1}
              size="40px"
              key={`${i}-${j}`}
              boxShadow="inner"
              bg={playerColor[p as Player] || "gray.300"}
            />
          ))}
          <Circle
            m={1}
            size="40px"
            boxShadow="base"
            visibility="hidden"
            bg={playerColor[player]}
            _groupHover={{
              visibility: gameOver ? "hidden" : "visible",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
