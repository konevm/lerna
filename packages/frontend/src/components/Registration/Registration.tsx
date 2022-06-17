import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { asyncCreateCustomer } from "../../app/storeSlice";
import { AppRoutes } from "../../constants/app-routes.constants";
import { registrationSchema } from "../helpers/validationSchemas";
import ModalsWrapper from "../ModalWrapper/ModalsWrapper";
import "./Registration.scss";

const Registration: React.FC = () => {
  const ID = Number(new Date()).toString();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { errorMessage, registrationComplete } = useAppSelector((store) => store.data);

  useEffect(() => {
    if (registrationComplete) navigate(AppRoutes.AUTH);
  }, [navigate, registrationComplete]);

  return (
    <div className="app__registration">
      <Formik
        initialValues={{
          login: "",
          name: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          address: "",
          phone: "",
        }}
        validationSchema={registrationSchema}
        onSubmit={(values) => {
          dispatch(asyncCreateCustomer({ ...values, id: ID }));
        }}>
        {({ handleChange, values, errors, isSubmitting }) => (
          <Form className="reg__form">
            <TextField
              label="Login"
              variant="outlined"
              value={values.login}
              className="form__login"
              name="login"
              helperText={errors.login || errorMessage}
              error={!!(errors.login || errorMessage)}
              onChange={handleChange}
            />
            <TextField
              label="Name"
              variant="outlined"
              value={values.name}
              className="form__name"
              name="name"
              helperText={errors.name}
              error={!!errors.name}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={values.lastName}
              name="lastName"
              helperText={errors.lastName}
              error={!!errors.lastName}
              className="form__last-name"
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              className="form__email"
              name="email"
              value={values.email}
              helperText={errors.email}
              error={!!errors.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              className="form__password"
              name="password"
              value={values.password}
              helperText={errors.password}
              error={!!errors.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              className="form__confirm-password"
              name="confirmPassword"
              value={values.confirmPassword}
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
              onChange={handleChange}
            />
            <TextField
              label="Post Address"
              variant="outlined"
              className="form__address"
              name="address"
              value={values.address}
              helperText={errors.address}
              error={!!errors.address}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              className="form__phone"
              name="phone"
              value={values.phone}
              helperText={errors.phone}
              error={!!errors.phone}
              onChange={handleChange}
            />
            <Button className="form__button" variant="contained" type="submit">
              Get Registered
            </Button>
            {isSubmitting && (
              <ModalsWrapper>
                <AutorenewIcon className="wait" data-testid="wait" />
              </ModalsWrapper>
            )}
          </Form>
        )}
      </Formik>
      <Link to={AppRoutes.AUTH}>Get Authorized</Link>
    </div>
  );
};

export default Registration;
