import { PopoverContent, Text } from '@chakra-ui/react';

interface CustomPopoverContentProps {
  icon?: React.ReactNode;
  text: string;
}

export const CustomPopoverContent = (props: CustomPopoverContentProps) => {
  return (
    <PopoverContent bg={'grey'} display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} borderRadius={0} padding={2} gap={2}>
      {props.icon}
      <Text fontSize={'md'} fontWeight={'bolder'}>
        {props.text}
      </Text>
    </PopoverContent>
  );
};
