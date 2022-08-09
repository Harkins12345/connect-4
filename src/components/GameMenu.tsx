import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Input,
  useDisclosure
} from "@chakra-ui/react";

import { FC, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  boardState,
  gameOverState,
  boardCols,
  boardRows,
  winningAmount,
  playerOneName,
  playerTwoName,
  playerOneColor,
  playerTwoColor
} from "state";

const GameMenu: FC = () => {

  const [gameOver, setGameOver] = useRecoilState(gameOverState);
  const [columns, setColums] = useRecoilState(boardCols);
  const setRows = useSetRecoilState(boardRows);
  const setBoardState = useSetRecoilState(boardState);
  const setWinningAmountState = useSetRecoilState(winningAmount);

  const setPlayerOneNameState = useSetRecoilState(playerOneName);
  const setPlayerTwoNameState = useSetRecoilState(playerTwoName);

  const [PlayerOneColorState, setPlayerOneColorState] = useRecoilState(playerOneColor);
  const [PlayerTwoColorState, setPlayerTwoColorState] = useRecoilState(playerTwoColor);

  const { onClose } = useDisclosure()


  // Customise the board size
  useEffect(() => {
    setBoardState(Array(columns).fill([]))
  }, [columns])

  // Player setting functions

  const setPlayerOneName = (e: any) => {
    setPlayerOneNameState(e.target.value)
  }

  const setPlayerTwoName = (e: any) => {
    setPlayerTwoNameState(e.target.value)
  }

  const setPlayerOneColor = (e: any) => {
    switch (e.target.value) {
      case '1': {
        setPlayerOneColorState('#f10000')
        break
      }
      case '2': {
        setPlayerOneColorState('#f18900')
        break
      }
      case '3': {
        setPlayerOneColorState('#e5f100')
        break
      }
      case '4': {
        setPlayerOneColorState('#00f118')
        break
      }
      case '5': {
        setPlayerOneColorState('#00e5f1')
        break
      }
      case '6': {
        setPlayerOneColorState('#0010f1')
        break
      }
      default: {
        setPlayerOneColorState('#f10000')
        break
      }
    }
  }

  const setPlayerTwoColor = (e: any) => {
    switch (e.target.value) {
      case '1': {
        setPlayerTwoColorState('#f10000')
        break
      }
      case '2': {
        setPlayerTwoColorState('#f18900')
        break
      }
      case '3': {
        setPlayerTwoColorState('#e5f100')
        break
      }
      case '4': {
        setPlayerTwoColorState('#00f118')
        break
      }
      case '5': {
        setPlayerTwoColorState('#00e5f1')
        break
      }
      case '6': {
        setPlayerTwoColorState('#0010f1')
        break
      }
      default: {
        setPlayerTwoColorState('#0010f1')
        break
      }
    }
  }

  // Board setting functions

  const setBoardSize = (e: any) => {
    switch (e.target.value) {
      case '1': {
        setColums(5)
        setRows(5)
        break
      }
      case '2': {
        setColums(6)
        setRows(7)
        break
      }
      case '3': {
        setColums(8)
        setRows(10)
        break
      }
      case '4': {
        setColums(10)
        setRows(12)
        break
      }
      default: {
        setColums(6)
        setRows(7)
        break
      }
    }
  }

  const setWinningAmount = (e: any) => {
    switch (e.target.value) {
      case '1': {
        setWinningAmountState(3)
        break
      }
      case '2': {
        setWinningAmountState(4)
        break
      }
      case '3': {
        setWinningAmountState(5)
        break
      }
      default: {
        setWinningAmountState(4)
        break
      }
    }
  }

  // Begin game, close the menu
  const startGame = (e: any) => {
    e.preventDefault()
    setGameOver(false)
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={gameOver} onClose={onClose} isCentered>
      <form onSubmit={startGame}>
        <FormControl>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Game Settings</ModalHeader>
            <ModalBody>
              {/* Customise Player 1 and 2's name and color */}
              <FormLabel>Enter Player 1's name</FormLabel>
              <Input required type='text' onChange={setPlayerOneName} />

              <FormLabel>Set Player 1's color</FormLabel>
              <Select required placeholder="Select Player 1's color" onChange={setPlayerOneColor}>
                {/* Disable if the other player has already selected the color */}
                <option disabled={PlayerTwoColorState === "#f10000"} value={'1'}>Red</option>
                <option disabled={PlayerTwoColorState === "#f18900"} value={'2'}>Orange</option>
                <option disabled={PlayerTwoColorState === "#e5f100"} value={'3'}>Yellow</option>
                <option disabled={PlayerTwoColorState === "#00f118"} value={'4'}>Green</option>
                <option disabled={PlayerTwoColorState === "#00e5f1"} value={'5'}>Cyan</option>
                <option disabled={PlayerTwoColorState === "#0010f1"} value={'6'}>Blue</option>
              </Select>

              <FormLabel>Enter Player 2's name</FormLabel>
              <Input required type='text' onChange={setPlayerTwoName} />

              <FormLabel>Set Player 2's color</FormLabel>
              <Select required placeholder="Select Player 2's color" onChange={setPlayerTwoColor}>
                <option disabled={PlayerOneColorState === "#f10000"} value={'1'}>Red</option>
                <option disabled={PlayerOneColorState === "#f18900"} value={'2'}>Orange</option>
                <option disabled={PlayerOneColorState === "#e5f100"} value={'3'}>Yellow</option>
                <option disabled={PlayerOneColorState === "#00f118"} value={'4'}>Green</option>
                <option disabled={PlayerOneColorState === "#00e5f1"} value={'5'}>Cyan</option>
                <option disabled={PlayerOneColorState === "#0010f1"} value={'6'}>Blue</option>
              </Select>

              {/* Customise the game settings */}
              <FormLabel>Board Size</FormLabel>
              <Select required placeholder='Select Board Size' onChange={setBoardSize}>
                <option value={'1'}>5 x 5</option>
                <option value={'2'}>6 x 7</option>
                <option value={'3'}>8 x 10</option>
                <option value={'4'}>10 x 12</option>
              </Select>

              {/* Can change to connect 3/4/5 */}
              <FormLabel>Amount to connect</FormLabel>
              <Select required placeholder='Connect...' onChange={setWinningAmount}>
                <option value={'1'}>3</option>
                <option value={'2'}>4</option>
                <option value={'3'}>5</option>
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='blue'>
                Start Game
              </Button>
            </ModalFooter>
          </ModalContent>
        </FormControl>
      </form>
    </Modal>
  );
};

export default GameMenu;