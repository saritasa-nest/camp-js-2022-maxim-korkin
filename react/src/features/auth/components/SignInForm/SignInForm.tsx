import { Button, FormHelperText, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAppSelector } from 'src/store';
import { signIn } from 'src/store/auth/dispatchers';
import { selectAuthIsLoading, selectSignInError } from 'src/store/auth/selectors';
import { FormikTextField } from 'src/components/FormikTextField/FormikTextField';
import { SignInFormValues } from '../../shared/SignInFormValues';
import { FormValidationError } from '../../shared/FormValidationError';

const SignInValidationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email(FormValidationError.invalidEmail)
    .required(FormValidationError.required),
  password: Yup
    .string()
    .required(FormValidationError.required),
});

const SignInFormComponent: VFC = () => {
  const dispatch = useDispatch();
  const error = useAppSelector(selectSignInError);
  const isLoading = useAppSelector(selectAuthIsLoading);

  const onSignInSubmit = (values: SignInFormValues): void => {
    dispatch(signIn(values));
  };

  return (
    <>
      <Typography variant="h1" component="h1">Sign in</Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSignInSubmit}
        validationSchema={SignInValidationSchema}
      >
        <Form>
          <FormikTextField name="email" label="Email" />
          <FormikTextField name="password" type="password" label="Password" />
          <FormHelperText error>{error}</FormHelperText>
          <Button color="primary" variant="contained" fullWidth type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export const SignInForm = memo(SignInFormComponent);
