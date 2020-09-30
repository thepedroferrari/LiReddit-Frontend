import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/core";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  name: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  const { label, placeholder, name } = props;

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...field} id={name} name={name} placeholder={placeholder}></Input>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
