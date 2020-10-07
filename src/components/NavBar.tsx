import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from 'next/link';

import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

export const NavBar: React.FC = () => {

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  })
  let body = null;
  // loading
  fetching
    ? body = null
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
          <Box mr={2}>{data.me.username}</Box>
          <Button
            variant="link"
            onClick={() => { logout() }}
            isLoading={logoutFetching}
          >
            Logout
          </Button>
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

