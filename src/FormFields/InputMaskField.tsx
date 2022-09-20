import { ComponentProps } from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';
import { IMaskMixin } from 'react-imask';

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  mask: any;
  blocks?: any;
};

const InternalMaskTextField = IMaskMixin((props) => (
  <TextField {...(props as any)} />
));

type MaskProps = ComponentProps<typeof InternalMaskTextField>;

const MaskTextField = (props: TextFieldProps & MaskProps) => {
  return <InternalMaskTextField {...props} />;
};

export const InputMaskField = (props: Props) => {
  const { label, mask, ...rest } = props;
  const [field, meta] = useField(props);
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;

  const renderHelperText = () => {
    if (isError) {
      return error;
    }
  };

  return (
    <MaskTextField
      error={isError}
      helperText={renderHelperText()}
      {...field}
      {...rest}
      label={label}
      variant="outlined"
      mask={mask}
      overwrite
    />
  );
};
