import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';

type Props = {
  label: string;
  name: string;
  [x: string]: any;
};

export const CheckboxField = ({ label, ...props }: Props) => {
  const [field, meta, helper] = useField({ ...props, type: 'checkbox' });
  const { setValue } = helper;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;

  const renderHelperText = () => {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.checked);

  return (
    <FormControl error={isError} component="fieldset" sx={{ m: 1 }}>
      <FormControlLabel
        control={<Checkbox {...field} {...props} onChange={onChange} />}
        label={label}
      />
      {renderHelperText()}
    </FormControl>
  );
};
