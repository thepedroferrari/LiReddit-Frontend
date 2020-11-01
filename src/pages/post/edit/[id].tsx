import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import { InputField } from 'components/InputField';
import { Layout } from 'components/Layout';
import { useCreatePostMutation } from 'generated/graphql';
import { useIsAuth } from 'hooks/useIsAuth';
import { createUrqlClient } from 'utils/createUrqlClient';

const CreatePost: React.FC = () => {
  const router = useRouter();
  useIsAuth();

  const [, createPost] = useCreatePostMutation();


  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (input) => {
          const { error } = await createPost({ input });
          if (!error) router.push('/');
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
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(CreatePost)
