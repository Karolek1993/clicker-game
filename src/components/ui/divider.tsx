import { Box } from '@chakra-ui/react';

interface DividerProps {
  thickness: number;
  color?: string;
  width?: string;
}

export function Divider(props: DividerProps) {
  return <Box border={props.thickness + 'px solid'} borderColor={props.color || 'black'} width={props.width || '100%'} height={'100%'} />;
}
