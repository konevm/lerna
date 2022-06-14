import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { AppRoutes } from "../../constants/app-routes.constants";
import { authorisationSchema } from "../helpers/validationSchemas";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { asyncSignInCustomer } from "../../app/storeSlice";
import ModalsWrapper from "../ModalWrapper/ModalsWrapper";
import "./Authorization.scss";

const Authorization: React.FC = () => {
  const { isAuthorized } = useAppSelector((store) => store.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) navigate(AppRoutes.MAIN);
  }, [isAuthorized, navigate]);
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
              value={values.password}
              className="auth__password"
              name="password"
              error={!!errors.password}
              helperText={errors.password}
              onChange={handleChange}
            />
            <Button
              className="form__button"
              variant="contained"
              type="submit"
              disabled={!!errors.login || !!errors.password}>
              Get Authorized
            </Button>
            {isSubmitting && (
              <ModalsWrapper>
                <AutorenewIcon className="wait" data-testid="wait" />
              </ModalsWrapper>
            )}
          </Form>
        )}
      </Formik>
      <Link to={AppRoutes.REG}>Get Registered</Link>
    </div>
  );
};

export default Authorization;