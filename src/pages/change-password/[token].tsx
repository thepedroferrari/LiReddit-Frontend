import { Box, Button, Link, Flex } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage } from 'next'
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';


const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter()
  const [tokenError, setTokenError] = useState('')

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (options, { setErrors }) => {
          const response = await changePassword({
            newPassword: options.newPassword,
            token
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data?.changePassword.errors);

            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }

            setErrors(toErrorMap(response.data?.changePassword.errors))

          } else if (response.data?.changePassword.user) {
            router.push('/')
          }

        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="New Password"
                label="New Password"
                type="password"
                autoComplete="current-password"
              />
            </Box>
            {tokenError && (
              <Flex>
                <Box color='#f00' mr={2}>{tokenError}:</Box>
                <Link>
                  <NextLink href="/forgot-password">
                    Get a new reset token
                  </NextLink>
                </Link>
              </Flex>
            )}
            <Button
              mt={4}
              variantColor="green"
              isLoading={isSubmitting}
              type="submit"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
