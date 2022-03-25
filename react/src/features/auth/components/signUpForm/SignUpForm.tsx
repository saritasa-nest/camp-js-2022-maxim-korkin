import { Button, FormHelperText, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAppSelector } from 'src/store';
import { signUp } from 'src/store/auth/dispatchers';
import { selectAuthIsLoading, selectSignUpError } from 'src/store/auth/selectors';
import { FormikTextField } from 'src/components/FormikTextField/FormikTextField';
import { SignUpFormValues } from '../../shared/SignUpFormValues';
import { FormValidationError } from '../../shared/FormValidationError';

const MIN_PASSWORD_LENGTH = 6;

const SignUpValidationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email(FormValidationError.invalidEmail)
    .required(FormValidationError.required),
  password: Yup
    .string()
    .required(FormValidationError.required)
    .min(MIN_PASSWORD_LENGTH, FormValidationError.tooShortPassword),
  repeatPassword: Yup
    .string()
    .required(FormValidationError.required)
    .oneOf([Yup.ref('password')], FormValidationError.passwordsDontMatch),
});

const SignUpFormComponent: VFC = () => {
  const dispatch = useDispatch();
  const error = useAppSelector(selectSignUpError);
  const isLoading = useAppSelector(selectAuthIsLoading);

  const onSignUpSubmit = (values: SignUpFormValues): void => {
    dispatch(signUp({
      email: values.email,
      password: values.password,
    }));
  };

  return (
    <>
      <Typography variant="h1" component="h1">Sign up</Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: '',
        }}
        onSubmit={onSignUpSubmit}
        validationSchema={SignUpValidationSchema}
      >
        <Form>
          <FormikTextField name="email" label="Email" />
          <FormikTextField name="password" type="password" label="Password" />
          <FormikTextField name="repeatPassword" type="password" label="Repeat password" />
          <FormHelperText error>{error}</FormHelperText>
          <Button color="primary" variant="contained" fullWidth type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export const SignUpForm = memo(SignUpFormComponent);
