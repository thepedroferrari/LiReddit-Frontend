import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';

import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const Login: React.FC = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (options, { setErrors }) => {
          const response = await login({options});

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
              name="username"
              placeholder="username"
              label="Username"
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

export default Login;
