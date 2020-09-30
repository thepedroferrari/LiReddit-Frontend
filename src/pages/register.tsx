import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import {Formik, Form} from 'formik'
import { Wrapper } from '../components/Wrapper';
interface registerProps {

}


const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {({values, handleChange, isSubmitting}) => (
        <Form>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              value={values.username}
              onChange={handleChange}
              id="username"
              placeholder="username"
            />
            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
            <Button
              mt={4}
              variantColor="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Register
          </Button>
          </FormControl>
        </Form>
      )}
      </Formik>
    </Wrapper>
    );
}

export default Register;
