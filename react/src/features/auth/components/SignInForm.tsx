import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { memo, VFC } from 'react';
import * as Yup from 'yup';

interface FormValues {
  /** Email. */
  readonly email: string;
  /** Password. */
  readonly password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignInFormComponent: VFC = () => {
  const onSignInSubmit = (values: FormValues): void => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: onSignInSubmit,
    validationSchema: SignInSchema,
    validateOnMount: true,
    validateOnChange: true,
  });

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export const SignInForm = memo(SignInFormComponent);
