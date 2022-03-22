import { Button, FormHelperText, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useAppSelector } from 'src/store';
import { signUp } from 'src/store/auth/dispatchers';
import { selectSignUpError } from 'src/store/auth/selectors';

interface SignUpFormValues {
  /** Email. */
  readonly email: string;
  /** Password. */
  readonly password: string;
  /** Password repeat. */
  readonly repeatPassword: string;
}

const SignUpValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(6, 'Password should be at least 6 characters'),
  repeatPassword: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Passwords doesn\'t match'),
});

const SignUpFormComponent: VFC = () => {
  const dispatch = useDispatch();
  const error = useAppSelector(selectSignUpError);

  const onSignUpSubmit = async (values: SignUpFormValues): Promise<void> => {
    dispatch(signUp({
      email: values.email,
      password: values.password,
    }));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: onSignUpSubmit,
    validationSchema: SignUpValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
  });

  return (
    <>
      <h1>Sign Up</h1>
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
        <TextField
          fullWidth
          name="repeatPassword"
          label="Repeat password"
          type="password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
          helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
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

export const SignUpForm = memo(SignUpFormComponent);
