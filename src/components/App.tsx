import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import Board from "components/Board";
import GameControls from "components/GameControls";
import GameProgress from "components/GameProgress";
import GameMenu from "components/GameMenu";
import { FC } from "react";
import { RecoilRoot } from "recoil";

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Container py={4} as={VStack}>
        <Board />
        <GameProgress />
        <GameControls />
        <GameMenu />
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
