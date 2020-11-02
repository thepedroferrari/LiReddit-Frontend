import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '_/utils/createUrqlClient';
import { Layout } from '_/components/Layout';
import { Box, Heading, Flex } from '@chakra-ui/core';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import EditDeletePostButtons from '_/components/EditDeletePostButtons';

const Post = () => {
  const [{ data, fetching }] = useGetPostFromUrl();

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

  const { title, author, text, id } = data.post;

  return (
    <Layout>
      <Flex width="100px" mb={2} justifyContent="space-around" alignSelf="end" >
        <EditDeletePostButtons id={id} authorId={author.id} />
      </Flex>
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
