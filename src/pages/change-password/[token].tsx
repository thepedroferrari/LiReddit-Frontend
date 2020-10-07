import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { NextPage } from 'next'
import React from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';


const ChangePassword: NextPage<{ token: string }> = ({token}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (options, { setErrors }) => {
          // const response = await login(options);

          // console.log({ response })
          // if (response.data?.login.errors) {
          //   console.log(toErrorMap(response.data?.login.errors))
          //   setErrors(toErrorMap(response.data?.login.errors))
          // } else if (response.data?.login.user) {
          //   router.push('/')
          // }

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

export default ChangePassword
