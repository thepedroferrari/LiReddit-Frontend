import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';

const CreatePost: React.FC = () => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (input) => {
          await createPost({ input });
          router.push('/')
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
