import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useRouter } from 'next/router';
import { usePostQuery } from '../../generated/graphql';
import { Layout } from '../../components/Layout';
import { Box, Heading } from '@chakra-ui/core';

const Post = () => {
  const router = useRouter();
  const postId = typeof router.query.id === 'string'
    ? parseInt(router.query.id)
    : -1;
  const shouldPause = postId === -1;

  const [{ data, fetching }] = usePostQuery({
    pause: shouldPause,
    variables: {
      id: postId
    }
  }
  )
  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>Could not find this post.</div>
      </Layout>
    )
  }

  const { title, author, text } = data.post;

  return (
    <Layout>
      <Heading size="2xl">{title}</Heading>
      <Heading size="xs" mb={4}>By {author.username}</Heading>
      <Box p="10">
        <p>
          {text}
        </p>
      </Box>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
