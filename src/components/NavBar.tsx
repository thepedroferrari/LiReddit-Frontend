import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

export const NavBar: React.FC = () => {
  const [{ data, fetching }] = useMeQuery()
  let body = null;

  // loading
  fetching
    ? body = <p>Loading...</p>
    : !data?.me
      ? body = (
        <>
          <NextLink href="/login">
            <Link mr={2}>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link mr={2}>Register</Link>
          </NextLink>
        </>
      )
      : body = (
        <Flex>
          <Box>{data.me.username}</Box>
          <Button variant="link">Logout</Button>
        </Flex>
      );

  return (
    <Flex bg="#ffd500" p={4}>
      <NextLink href="/">
        <Link mr={2}>Logo</Link>
      </NextLink>
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
}
