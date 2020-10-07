import { Box, Button, Link, Flex } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (options, { setErrors }) => {
          const response = await login(options);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors))
          } else if (response.data?.login.user) {
            router.push('/')
          }

        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="your@email.com"
                label="Email"
                type="email"
                autoComplete="email"
              />
            </Box>
            <Button
              mt={4}
              variantColor="green"
              isLoading={isSubmitting}
              type="submit"
            >
              Get a new password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);
