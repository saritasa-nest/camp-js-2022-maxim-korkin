import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { memo, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'src/api/services/auth/auth.service';
import * as Yup from 'yup';

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
  password: Yup.string().required('Required'),
  repeatPassword: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Passwords doesn\'t match'),
});

const SignUpFormComponent: VFC = () => {
  const navigate = useNavigate();
  const onSignUpSubmit = async (values: SignUpFormValues): Promise<void> => {
    try {
      await AuthService.signUp(values.email, values.password);
      navigate('auth/sign-in');
    } catch (error: unknown) {
      console.error(123);
    }
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
    <div>
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export const SignUpForm = memo(SignUpFormComponent);
