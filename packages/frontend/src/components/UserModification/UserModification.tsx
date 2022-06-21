import React from "react";
import { Formik, Form } from "formik";
import { TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { changeAdminModalVisibility } from "../../app/adminSlice";
import { asyncUserModification } from "../../app/trunks";
import { ICustomer } from "../helpers/interfaces";
import { modificationSchema } from "../helpers/validationSchemas";
import "./UserModification.scss";

interface IUserModificationProps {
  user: ICustomer;
  setChangeOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedCustomerId: React.Dispatch<React.SetStateAction<string>>;
}

const UserModification: React.FC<IUserModificationProps> = ({
  user,
  setChangeOpened,
  setDeletedCustomerId,
}) => {
  const { login, name, lastName, email, address, phone, isAdmin, id } = user;
  const dispatch = useAppDispatch();
  return (
    <main className="admin__user-form">
      <Formik
        initialValues={{
          login: login,
          name: name,
          lastName: lastName,
          email: email,
          address: address,
          phone: phone,
          isAdmin: isAdmin,
        }}
        onSubmit={(values) => {
          const newUser = { ...values, id: id, password: user.password };
          dispatch(asyncUserModification(newUser));
          setChangeOpened(false);
        }}
        validationSchema={modificationSchema}>
        {({ handleChange, values, errors }) => (
          <Form>
            <TextField
              label="Login"
              variant="outlined"
              value={values.login}
              className="form__login"
              name="login"
              helperText={errors.login}
              error={!!errors.login}
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
            <FormControlLabel
              control={
                <Checkbox
                  name="isAdmin"
                  value={isAdmin}
                  defaultChecked={isAdmin}
                  onChange={handleChange}
                />
              }
              label="Admin"
            />
            <Button className="form__button" variant="contained" type="submit">
              Set Changes
            </Button>
            <Button
              className="form__button delete"
              variant="contained"
              onClick={() => {
                dispatch(changeAdminModalVisibility());
                setDeletedCustomerId(id);
              }}>
              Delete customer
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default UserModification;
