import { Box, Flex, Link } from '@chakra-ui/core';
import NextLink from 'next/link';

export const NavBar: React.FC = () => {
  return (
    <Flex bg="tomato" p={4}>
      <NextLink href="/">
        <Link mr={2}>Logo</Link>
      </NextLink>
      <Box ml={"auto"}>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
}
