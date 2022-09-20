import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@mui/material";

type Props = {
  label: string;
  name: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  errorText?: string;
  [x: string]: any;
};

export const InputField = (props: Props) => {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  const renderHelperText = () => {
    if (isError) {
      return error;
    }
  };

  return (
    <TextField
      type="text"
      error={isError}
      helperText={renderHelperText()}
      {...field}
      {...rest}
    />
  );
};
