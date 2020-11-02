import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';

import { InputField } from '_/components/InputField';
import { Wrapper } from '_/components/Wrapper';
import { useForgotPasswordMutation } from '_/generated/graphql';
import { createUrqlClient } from '_/utils/createUrqlClient';

const ForgotPassword: React.FC = () => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (email) => {
          await forgotPassword(email);
          setComplete(true)
        }}
      >
        {({ isSubmitting }) => complete
          ? (
            <Box>
              If that email is registered within our database, it will receive a link to reset password.
            </Box>
          )
          : (
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
