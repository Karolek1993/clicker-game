import { Box, Text } from '@chakra-ui/react';

import { useUIContext } from '../../context/UIContext';
import { useGameLogicContext } from '../../context/GameLogicContext';
import { CustomButton } from '../ui/custom-button';
import { Divider } from '../ui/divider';
import { FarmIcon, WindmillIcon, BakeryIcon, CoinIcon, WheatIcon } from '../ui/icons';

import { useCurrencyFormater } from '../../hooks/useNumberFormat';

export function LeftSideBar() {
  const { farmWindowOpen, windmillWindowOpen, bakeryWindowOpen, setFarmWindow, setWindmillWindow, setBakeryWindow } = useUIContext();
  const { moneyAmount, wheatAmount, wheatStorageAmount, sellWheat } = useGameLogicContext();

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} border={'3px solid black'} width={'25%'} height={'100%'} padding={2} gap={2}>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} border={'2px solid black'} padding={2} gap={2}>
        <CustomButton active={farmWindowOpen} icon={<FarmIcon size={32} color={'yellow'} />} onClick={() => setFarmWindow()} text="Wheat Farm" />
        <CustomButton active={windmillWindowOpen} icon={<WindmillIcon size={32} color={'yellow'} />} onClick={() => setWindmillWindow()} text="Windmill" />
        <CustomButton active={bakeryWindowOpen} icon={<BakeryIcon size={32} color={'yellow'} />} onClick={() => setBakeryWindow()} text="Bakery" />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} border={'2px solid black'} padding={2} gap={2}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <CoinIcon size={32} color={'yellow'} />
          <Text fontSize={'xl'}>$: {useCurrencyFormater(moneyAmount)}</Text>
        </Box>
        <Divider thickness={1} width={'100%'} />
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'60%'} alignItems={'center'}>
            <WheatIcon size={32} color={'yellow'} />
            <Text fontSize={'xl'}>
              {wheatAmount} / {wheatStorageAmount}
            </Text>
          </Box>
          <CustomButton onClick={() => sellWheat(10)} text="Sell" />
        </Box>
      </Box>
    </Box>
  );
}
