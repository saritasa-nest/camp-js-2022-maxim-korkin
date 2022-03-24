import { BaseTextFieldProps, TextField } from '@mui/material';
import { FieldInputProps, FormikErrors, FormikProps } from 'formik';
import { memo, VFC } from 'react';
import { SignUpFormValues } from '../../shared/SignUpFormValues';

interface FormTextFieldProps {
  /** Field props. */
  readonly field: FieldInputProps<string>;
  /** Form props. */
  readonly form: FormikProps<SignUpFormValues>;
}

interface Props extends FormTextFieldProps, BaseTextFieldProps {}

const SignUpTextFieldComponent: VFC<Props> = ({
  field,
  form,
  label,
  type,
}) => {
  const fieldName = field.name as keyof FormikErrors<SignUpFormValues>;
  const currentError = form.errors[fieldName];
  return (
    <TextField
      fullWidth
      name={fieldName}
      label={label}
      value={field.value}
      onChange={field.onChange}
      error={form.touched[fieldName] && Boolean(currentError)}
      helperText={form.touched[fieldName] && currentError}
      margin="normal"
      type={type}
    />
  );
};

export const SignUpTextField = memo(SignUpTextFieldComponent);
