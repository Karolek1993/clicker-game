import { Box, Text } from '@chakra-ui/react';

import { useUIContext } from '../../context/UIContext';
import { useGameLogicContext } from '../../context/GameLogicContext';
import { CustomButton } from '../ui/custom-button';
import { Divider } from '../ui/divider';
import { StorageSection } from '../StorageSection';
import { FarmIcon, CoinIcon, WheatIcon, WindmillIcon } from '../ui/icons';

import { useCurrencyFormater } from '../../hooks/NumberFormater';

export function LeftSideBar() {
  const { farmWindowOpen, setFarmWindow, windmillWindowOpen, setWindmillWindow } = useUIContext();
  const { moneyAmount, wheatAmount, wheatStorageAmount, sellWheat, farmLevel } = useGameLogicContext();

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} border={'3px solid black'} width={'25%'} height={'100%'} padding={2} gap={2}>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} border={'2px solid black'} padding={2} gap={2}>
        <CustomButton active={farmWindowOpen} icon={<FarmIcon size={32} color={'yellow'} />} onClick={() => setFarmWindow()} text={'Wheat Farm ' + 'LvL:' + farmLevel} />
        <CustomButton active={windmillWindowOpen} icon={<WindmillIcon size={32} color={'yellow'} />} onClick={() => setWindmillWindow()} text={'Windmill'} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} border={'2px solid black'} padding={2} gap={2}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <CoinIcon size={32} color={'yellow'} />
          <Text fontSize={'xl'}>{useCurrencyFormater(moneyAmount)}</Text>
        </Box>
        <Divider thickness={1} width={'100%'} />
        <StorageSection icon={<WheatIcon size={32} color={'yellow'} />} amount={wheatAmount} maxAmount={wheatStorageAmount} sell={sellWheat} sellAmount={10} />
      </Box>
    </Box>
  );
}
