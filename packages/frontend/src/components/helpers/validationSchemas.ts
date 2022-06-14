import * as yup from "yup";

export const authorisationSchema = yup.object().shape({
  login: yup
    .string()
    .required()
    .min(5)
    .matches(
      /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g,
      "Not allowed space and not-latin letters"
    ),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/gm,
      "Must contain at least one digit, one uppercase letter and one of (!@#$%^&())"
    ),
});

export const registrationSchema = yup.object().shape({
  login: yup.string().required().min(5),
  name: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .required("Required")
    .matches(/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, "Please provide valid email"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/gm,
      "Must contain at least one digit, one uppercase letter and one of (!@#$%^&())"
    ),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  address: yup.string().required(),
  phone: yup
    .string()
    .required("Place here your phone")
    .max(10, "Too long for nuber")
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
      "It is not a phone number"
    ),
});
