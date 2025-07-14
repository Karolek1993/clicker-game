import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';

import { useUIContext } from '../../context/UIContext';
import { useGameLogicContext } from '../../context/GameLogicContext';
import { Divider } from '../ui/divider';
import { Crop } from '../Crop';
import { WheatIcon, FieldIcon } from '../ui/icons';

export function MainWindow() {
  const { farmWindowOpen } = useUIContext();
  const { harvestWheat, wheatAmount, wheatStorageAmount, cropRespawnTime, wheatFieldAmount } = useGameLogicContext();

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} border={'3px solid black'} width={'50%'} height={'100%'}>
      <Box width={'100%'} height={'100%'} padding={2}>
        <Box display={farmWindowOpen ? 'flex' : 'none'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
            <FieldIcon size={48} color="yellow" />
            <Text fontSize={'xl'} fontWeight={'bolder'}>
              WHEAT FIELDS
            </Text>
          </Box>
          <Divider thickness={1} width={'100%'} />
          <Wrap key={'wheat-crops'} justify={'center'} gap={2}>
            {Array.from({ length: 9 + wheatFieldAmount }, (_, index) => (
              <WrapItem key={index}>
                <Crop
                  cropRespawnTime={cropRespawnTime}
                  cropName="Wheat"
                  cropCount={wheatAmount}
                  cropStorage={wheatStorageAmount}
                  icon={<WheatIcon size={48} color="yellow" />}
                  onClick={() => harvestWheat()}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
}
