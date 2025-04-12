import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={css.error} />
        </label>

        <label>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={css.error} />
        </label>

        <label>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={css.error} />
        </label>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
