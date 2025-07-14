import { Box, Text } from '@chakra-ui/react';

import { CustomButton } from './ui/custom-button';

interface StorageSectionProps {
    icon: React.ReactNode;
    amount: number;
    maxAmount: number;
    sell: (amount: number) => void;
    sellAmount: number;
}

export function StorageSection(props: StorageSectionProps) {
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'60%'} alignItems={'center'}>
        {props.icon}
        <Text fontSize={'xl'}>
          {props.amount} / {props.maxAmount}
        </Text>
      </Box>
      <CustomButton onClick={() => props.sell(props.sellAmount)} text="Sell" />
    </Box>
  );
}
