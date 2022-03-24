import { Button, FormHelperText } from '@mui/material';
import { Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAppSelector } from 'src/store';
import { signIn } from 'src/store/auth/dispatchers';
import { selectSignInError } from 'src/store/auth/selectors';
import { FormikTextField } from 'src/components/FormikTextField/FormikTextField';
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
          <FormikTextField name="email" label="Email" />
          <FormikTextField name="password" type="password" label="Password" />
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
