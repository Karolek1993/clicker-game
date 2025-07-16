import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';

import { useUIContext } from '../../context/UIContext';
import { useGameLogicContext } from '../../context/GameLogicContext';
import { Divider } from '../ui/divider';
import { Item } from '../Item';
import { WheatIcon, FieldIcon, WindmillIcon, FlourIcon } from '../ui/icons';

export function MainWindow() {
  const { farmWindowOpen, windmillWindowOpen } = useUIContext();
  const { harvestWheat, wheatAmount, wheatStorageAmount, cropRespawnTime, wheatFieldAmount, flourAmount, flourStorageAmount, makeFlour } = useGameLogicContext();

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
                <Item
                  itemRespawnTime={cropRespawnTime}
                  itemName="Wheat"
                  itemCount={wheatAmount}
                  itemStorage={wheatStorageAmount}
                  icon={<WheatIcon size={48} color="yellow" />}
                  onClick={() => harvestWheat()}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Box display={windmillWindowOpen ? 'flex' : 'none'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
            <WindmillIcon size={48} color="yellow" />
            <Text fontSize={'xl'} fontWeight={'bolder'}>
              WINDMILL
            </Text>
          </Box>
          <Divider thickness={1} width={'100%'} />
          <Wrap key={'flour-bags'} justify={'center'} gap={2}>
            {Array.from({ length: 9 }, (_, index) => (
              <WrapItem key={index}>
                <Item
                  itemRespawnTime={cropRespawnTime}
                  itemName="Flour"
                  itemCount={flourAmount}
                  itemStorage={flourStorageAmount}
                  icon={<FlourIcon size={48} color="yellow" />}
                  onClick={() => makeFlour()}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
}
