import { Container } from '@chakra-ui/react';
import { Toaster } from './components/ui/toaster';

// import { useGameLogicContext } from './context/GameLogicContext';
import { LeftSideBar } from './components/layout/LeftSideBar';
import { MainWindow } from './components/layout/MainWindow';
import { RightSideBar } from './components/layout/RightSideBar';

export function App() {
  // const { saveGame, loadGame } = useGameLogicContext();

  // loadGame();
  // saveGame();

  return (
    <Container
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'flex-start'}
      border={'1px solid red'}
      maxW={'100%'}
      height={'100vh'}
      padding={2}
      gap={2}
    >
      <LeftSideBar />
      <MainWindow />
      <RightSideBar />
      <Toaster />
    </Container>
  );
}
