import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameOverState, playerState, playerOneName, playerTwoName } from "state";

const GameProgress: FC = () => {
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const playerOneNameState = useRecoilValue(playerOneName);
  const playerTwoNameState = useRecoilValue(playerTwoName);
  
  const playerNames = {
    1: playerOneNameState,
    2: playerTwoNameState
  }
  
  const name = playerNames[player];

  return (
    <Heading as="h3" size="lg">
      {gameOver ? `${name} wins!` : `${name}'s turn`}
    </Heading>
  );
};

export default GameProgress;
