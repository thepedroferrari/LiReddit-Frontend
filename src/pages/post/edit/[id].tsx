import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';

import { InputField } from 'components/InputField';
import { Layout } from 'components/Layout';
import { createUrqlClient } from 'utils/createUrqlClient';
import { useUpdatePostMutation, usePostQuery } from '../../../generated/graphql';
import { useGetPostId } from '../../../utils/useGetPostId';
import { useRouter } from 'next/router';

const EditPost: React.FC = () => {
  const router = useRouter();
  const postId = useGetPostId();
  const [{ data, fetching }] = usePostQuery({
    pause: postId === -1,
    variables: {
      id: postId
    }
  });
  const [, updatePost] = useUpdatePostMutation()

  if (fetching) return (
    <Layout>
      <div>Loading...</div>
    </Layout>
  )

  if (!data?.post) return (
    <Layout>
      <div>Loading...</div>
    </Layout>
  )

  const { title, text } = data.post;

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title, text }}
        onSubmit={async (input) => {
          await updatePost({ id: postId, ...input });
          router.push(`/post/${postId}`)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Post Title"
              label="Post Title"
              autoComplete=''
            />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="content..."
                label="Post content"
                type="text"
                textarea
              />
            </Box>

            <Button
              mt={4}
              variantColor="green"
              isLoading={isSubmitting}
              type="submit"
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(EditPost)
