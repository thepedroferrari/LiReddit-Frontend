import { withUrqlClient } from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { Stack, Box, Heading, Text, Flex, Button } from '@chakra-ui/core';
import NextLink from 'next/link';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });

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
