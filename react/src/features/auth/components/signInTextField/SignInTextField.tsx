import { BaseTextFieldProps, TextField } from '@mui/material';
import { FieldInputProps, FormikErrors, FormikProps } from 'formik';
import { memo, VFC } from 'react';
import { SignInFormValues } from '../../shared/SignInFormValues';

interface FormTextFieldProps {
  /** Field props. */
  readonly field: FieldInputProps<String>;
  /** Form props. */
  readonly form: FormikProps<SignInFormValues>;
}

interface Props extends FormTextFieldProps, BaseTextFieldProps {}

const SignInTextFieldComponent: VFC<Props> = ({
  field,
  form,
  label,
  type,
}) => {
  const fieldName = field.name as keyof FormikErrors<SignInFormValues>;
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

export const SignInTextField = memo(SignInTextFieldComponent);
