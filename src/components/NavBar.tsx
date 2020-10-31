import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from 'next/link';

import { useMeQuery, useLogoutMutation } from '../generated/graphql';

const NavBarBody = () => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery()

  return <Box ml={"auto"}>
    {fetching
      ? <span>loading...</span>
      : !data?.me
        ? (
          <>
            <NextLink href="/login">
              <Link mr={2}>Login</Link>
            </NextLink>
            <NextLink href="/register">
              <Link mr={2}>Register</Link>
            </NextLink>
          </>
        )
        : (
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
        )}
  </Box>
}

export const NavBar: React.FC = () => (
  <Flex bg="#ffd500" p={4} zIndex={1} position="sticky" top={0}>
    <NextLink href="/">
      <Link mr={2}>Logo</Link>
    </NextLink>
    <NavBarBody />
  </Flex>
);
