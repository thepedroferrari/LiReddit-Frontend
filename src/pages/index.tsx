import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import { withUrqlClient } from "next-urql";
import NextLink from 'next/link';
import { useCallback, useState } from 'react';

import { Layout } from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string
  })

  const [{ data, fetching }] = usePostsQuery({ variables });

  const handlePagination = useCallback(() => {
    if (!data) {
      console.log('not data')
      return;
    }

    setVariables({
      limit: variables.limit,
      cursor: data.posts.posts[data?.posts.posts.length - 1].createdAt
    })
  }, [])

  return (
    <Layout>
      <Flex align="center" mb={8}>
        <Heading>LiReddit</Heading>
        <NextLink href="/create-post">
          <Button background="#77cc22" ml="auto">Create Post</Button>
        </NextLink>
      </Flex>
      {data && !fetching
        ? (
          <Stack spacing={8}>
            {data!.posts.posts.map(post => (
              <header key={post.id}>
                <Box p={5} shadow="md" borderWidth="1px" mb={8}>
                  <Heading fontSize="xl">{post.title}</Heading>
                  <Text mt={4}>{post.excerpt}...</Text>
                </Box>
              </header>
            ))}
          </Stack>
        ) : <p>loading...</p>
      }
      {data && data.posts.hasMore && (
        <Flex>
          <Button m="auto"
            onClick={handlePagination}
            isLoading={fetching}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
