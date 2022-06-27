import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppRoutes } from "../../constants/app-routes.constants";
import { authorisationSchema } from "../helpers/validationSchemas";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setRegisteredFalse } from "../../app/storeSlice";
import { asyncSignInCustomer } from "../../app/trunks";
import ModalsWrapper from "../ModalWrapper/ModalsWrapper";
import "./Authorization.scss";

const Authorization: React.FC = () => {
  const { isAuthorized, errorMessage, registrationComplete } = useAppSelector(
    (store) => store.data
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (registrationComplete) dispatch(setRegisteredFalse());
  }, [dispatch, registrationComplete]);

  useEffect(() => {
    if (isAuthorized) navigate(AppRoutes.MAIN);
  }, [isAuthorized, navigate]);

  const loginWithGoogle = useGoogleLogin({
    scope:
      "email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: (Response) => console.log(Response),
  });

  return (
    <div className="app__authorization">
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        validationSchema={authorisationSchema}
        onSubmit={(values) => {
          dispatch(asyncSignInCustomer(values));
        }}>
        {({ isSubmitting, handleChange, values, errors }) => (
          <Form className="auth__form">
            <TextField
              label="Login"
              helperText={errors.login}
              variant="outlined"
              value={values.login}
              error={!!errors.login}
              className="auth__login"
              name="login"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "password" : "text"}
              value={values.password}
              className="auth__password"
              name="password"
              error={!!errors.password}
              helperText={errors.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}></TextField>
            <Button
              className="form__button"
              variant="contained"
              type="submit"
              disabled={!!errors.login || !!errors.password}>
              Get Authorized
            </Button>
            {isSubmitting && (
              <ModalsWrapper>
                {errorMessage !== "" ? (
                  <h2 className="form__error">Sorry, but {errorMessage}</h2>
                ) : (
                  <AutorenewIcon className="wait" data-testid="wait" />
                )}
              </ModalsWrapper>
            )}
          </Form>
        )}
      </Formik>
      <Link to={AppRoutes.REG}>Get Registered</Link>

      <span
        className="form_google"
        onClick={() => {
          loginWithGoogle();
        }}>
        Authorization by Google
      </span>
    </div>
  );
};

export default Authorization;
