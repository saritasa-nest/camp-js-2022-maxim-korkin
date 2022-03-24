import { Button, FormHelperText } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAppSelector } from 'src/store';
import { signIn } from 'src/store/auth/dispatchers';
import { selectSignInError } from 'src/store/auth/selectors';
import { SignInTextField } from 'src/features/auth/components/signInTextField/SignInTextField';
import { SignInFormValues } from '../../shared/SignInFormValues';

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignInFormComponent: VFC = () => {
  const dispatch = useDispatch();
  const error = useAppSelector(selectSignInError);

  const onSignInSubmit = (values: SignInFormValues): void => {
    dispatch(signIn(values));
  };

  return (
    <>
      <h1>Sign In</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSignInSubmit}
        validationSchema={SignInValidationSchema}
      >
        <Form>
          <Field name="email" component={SignInTextField} label="Email" />
          <Field name="password" component={SignInTextField} type="password" label="Password" />
          <FormHelperText error>{error}</FormHelperText>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export const SignInForm = memo(SignInFormComponent);
