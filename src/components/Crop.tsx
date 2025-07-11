import { Box, Float, Circle, Text } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { toaster } from '../components/ui/toaster';

interface CropProps {
  icon: React.ReactNode;
  cropName: string;
  cropCount: number;
  cropStorage: number;
  cropRespawnTime: number;
  onClick: () => void;
}

export function Crop(props: CropProps) {
  const targetSeconds = props.cropRespawnTime as number;

  const [active, setActive] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(targetSeconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleClick() {
    if (active) {
      return;
    }

    if (props.cropCount >= props.cropStorage) {
      toaster.create({
        description: props.cropName + ' Storage is full!',
        type: 'error',
        duration: 1000,
      });

      return;
    }

    startTimer();
    props.onClick();
    setActive(true);
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setSecondsLeft(targetSeconds);

    timerRef.current = setInterval(
      () => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setActive(false);
            return 0;
          }
          return prev - 1;
        });
      },
      targetSeconds <= 0 ? 0 : 1000
    );
  };

  return (
    <Box
      position={'relative'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      border={'1px solid'}
      borderColor={'black'}
      padding={2}
      onClick={() => handleClick()}
      _hover={{ cursor: 'pointer', bg: active ? 'none' : props.cropCount >= props.cropStorage ? 'none' : 'grey' }}
    >
      <Box display={targetSeconds <= 0 ? 'none' : 'flex'}>
        <Float display={active ? 'flex' : 'none'} offset={3}>
          <Circle size={4} bg={'orange.500'}>
            <Text fontSize={'xx-small'}>{secondsLeft}</Text>
          </Circle>
        </Float>
      </Box>
      <Box opacity={active ? 0.15 : 1}>{props.icon}</Box>
    </Box>
  );
}
