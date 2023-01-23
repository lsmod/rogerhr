import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import LoadingButton from "@mui/lab/LoadingButton";

import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

import useAuth from "../../api/hooks/useAuth";

const LoginPage = () => {
  const { login, hasSignin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    login(data.email, data.password);
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  useEffect(() => {
    if (hasSignin) {
      navigate("/pokemons");
    }
  }, [hasSignin, navigate]);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, invalid, form, ...props }) => (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Field name="email">
              {({ input, meta }) => (
                <FormControl>
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Input
                    {...input}
                    id="email"
                    aria-describedby="email-helper-text"
                    type="email"
                    error={meta.touched && meta.error}
                  />
                  <FormHelperText id="email-helper-text">
                    We'll never share your email.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <FormControl>
                  <InputLabel htmlFor="password">password</InputLabel>
                  <Input
                    {...input}
                    id="password"
                    aria-describedby="password-helper-text"
                    type="password"
                    error={meta.touched && meta.error}
                  />
                  <FormHelperText id="password-helper-text">
                    the stronger the better
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <LoadingButton
              loading={submitting}
              type="submit"
              disabled={invalid}
              id="login-button"
            >
              login
            </LoadingButton>
          </div>
        </form>
      )}
    />
  );
};

export default LoginPage;
