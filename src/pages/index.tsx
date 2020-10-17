import { withUrqlClient } from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { Link, Stack, Box, Heading, Text } from '@chakra-ui/core';
import NextLink from 'next/link';

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });

  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>
          Create Post
        </Link>
      </NextLink>
      {!data
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
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
