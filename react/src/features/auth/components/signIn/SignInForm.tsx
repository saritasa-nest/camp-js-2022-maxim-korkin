import { Button, FormHelperText, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAppSelector } from 'src/store';
import { signIn } from 'src/store/auth/dispatchers';
import { selectSignInError } from 'src/store/auth/selectors';

interface SignInFormValues {
  /** Email. */
  readonly email: string;
  /** Password. */
  readonly password: string;
}

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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onSignInSubmit,
    validationSchema: SignInValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
  });

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <FormHelperText error>{error}</FormHelperText>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export const SignInForm = memo(SignInFormComponent);
