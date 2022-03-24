import { Button, FormHelperText } from '@mui/material';
import { Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAppSelector } from 'src/store';
import { signUp } from 'src/store/auth/dispatchers';
import { selectSignUpError } from 'src/store/auth/selectors';
import { FormikTextField } from 'src/components/FormikTextField/FormikTextField';
import { SignUpFormValues } from '../../shared/SignUpFormValues';

const SignUpValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password should be at least 6 characters'),
  repeatPassword: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Passwords doesn\'t match'),
});

const SignUpFormComponent: VFC = () => {
  const dispatch = useDispatch();
  const error = useAppSelector(selectSignUpError);

  const onSignUpSubmit = (values: SignUpFormValues): void => {
    dispatch(signUp({
      email: values.email,
      password: values.password,
    }));
  };

  return (
    <>
      <h1>Sign Up</h1>
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
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export const SignUpForm = memo(SignUpFormComponent);
