import { Box } from '@chakra-ui/core';
import React from 'react'

interface WrapperProps {
  variant?: 'small' | 'regular';
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
