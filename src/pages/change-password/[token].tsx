import { Box, Button, Link, Flex } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage } from 'next'
import { useState } from 'react';
import { InputField } from '_/components/InputField';
import { Wrapper } from '_/components/Wrapper';
import { toErrorMap } from '_/utils/toErrorMap';
import { useChangePasswordMutation } from '_/generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '_/utils/createUrqlClient';
import NextLink from 'next/link';


const ChangePassword: NextPage = () => {
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('')
  const router = useRouter()
  const { token } = router.query;

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (options, { setErrors }) => {
          const response = await changePassword({
            newPassword: options.newPassword,
            token: typeof token === "string" ? token : ""
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
                <NextLink href="/forgot-password">
                  <Link>
                    Get a new reset token
                  </Link>
                </NextLink>
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

export default withUrqlClient(createUrqlClient)(ChangePassword)
