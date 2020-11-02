import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';

import { Wrapper } from '_/components/Wrapper';
import { InputField } from '_/components/InputField';
import { useRegisterMutation } from '_/generated/graphql';
import { toErrorMap } from '_/utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '_/utils/createUrqlClient';

const Register: React.FC = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (options, { setErrors }) => {
          const response = await register({options});

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data?.register.errors))
          } else if (response.data?.register.user) {
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
                name="email"
                placeholder="your@email.com"
                label="Email"
                type="email"
                autoComplete="email"
              />
            </Box>
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(Register);
