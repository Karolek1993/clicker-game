import { Button, type ButtonProps, Text } from '@chakra-ui/react';
import { Tooltip } from './tooltip';

interface CustomButtonProps extends ButtonProps {
  tooltip?: string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  active?: boolean;
  icon?: React.ReactNode;
  text: string;
}

export function CustomButton(props: CustomButtonProps) {
  return (
    <Tooltip disabled={props.tooltip === undefined ? true : false} content={props.tooltip} positioning={{ placement: props.tooltipPlacement }} openDelay={50} closeDelay={50}>
      <Button
        {...props}
        variant={'outline'}
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        size={'md'}
        borderRadius={0}
        bg={props.active ? 'grey' : 'transparent'}
        _hover={{ color: 'white', bg: 'black' }}
        gap={2}
      >
        {props.icon}
        <Text fontSize={'xl'} fontWeight={'bolder'}>
          {props.text}
        </Text>
      </Button>
    </Tooltip>
  );
}
