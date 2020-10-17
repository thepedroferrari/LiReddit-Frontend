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
    cursor: null as null | number
  })

  const [{ data, fetching }] = usePostsQuery({ variables });

  const handlePagination = useCallback(() => {
    if (!data || fetching) return;

    setVariables({
      limit: variables.limit,
      cursor: Number(data.posts[data?.posts.length - 1].createdAt)
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
      {!data || fetching
        ? <p>loading...</p>
        : (
          <Stack spacing={8}>
            {data.posts.map(post => (
              <header key={post.id}>
                <Box p={5} shadow="md" borderWidth="1px" mb={8}>
                  <Heading fontSize="xl">{post.title}</Heading>
                  <Text mt={4}>{post.excerpt}...</Text>
                </Box>
              </header>
            ))}
          </Stack>
        )
      }
      {data && <Flex><Button m="auto">Load more</Button></Flex>}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
