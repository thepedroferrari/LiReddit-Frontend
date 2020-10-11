import { Box } from '@chakra-ui/core';

export type WrapperVariant = 'small' | 'regular';
interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant = 'regular'}) => {
  return (
    <Box
      maxW={variant === 'small' ? "400px" : "800px"}
      mt={8}
      w="100%"
      mx="auto"
    >
      {children}
    </Box>
  );
}
