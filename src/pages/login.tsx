import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { createUrqlClient } from '../utils/createUrqlClient';

const Login: React.FC = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (options, { setErrors }) => {
          const response = await login(options);

          console.log({ response })
          if (response.data?.login.errors) {
            console.log(toErrorMap(response.data?.login.errors))
            setErrors(toErrorMap(response.data?.login.errors))
          } else if (response.data?.login.user) {
            router.push('/')
          }

        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
              autoComplete="username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="A secure password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Box>
            <Button
              mt={4}
              variantColor="green"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(Login);
