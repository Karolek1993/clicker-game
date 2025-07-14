import { Box, Text } from '@chakra-ui/react';

import { CustomButton } from './ui/custom-button';

import { useCurrencyFormater } from '../hooks/NumberFormater';

interface UpgradeSectionProps {
  icon: React.ReactNode;
  amount: number;
  maxAmount: number;
  cost: number;
  upgradeAmount: number;
  upgrade: (cost: number, amount: number) => void;
  text: string;
}

export function UpgradeSection(props: UpgradeSectionProps) {
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'50%'} alignItems={'center'}>
        {props.icon}
        <Text fontSize={'xl'}>
          {props.amount} / {props.maxAmount}
        </Text>
      </Box>
      <CustomButton
        disabled={props.amount >= props.maxAmount}
        tooltip={props.amount >= props.maxAmount ? 'Max' : useCurrencyFormater(props.cost)}
        tooltipPlacement="left"
        onClick={() => props.upgrade(props.cost, props.upgradeAmount)}
        text={props.text}
      />
    </Box>
  );
}
