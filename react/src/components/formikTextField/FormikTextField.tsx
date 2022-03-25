import { TextField } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import { VFC } from 'react';

interface TextFieldProps {
  /** Label. */
  readonly label: string;
}

type Props = FieldHookConfig<string> & TextFieldProps;

export const FormikTextField: VFC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      fullWidth
      name={field.name}
      label={label}
      type={props.type}
      value={field.value}
      onChange={field.onChange}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      margin="normal"
    />
  );
};
