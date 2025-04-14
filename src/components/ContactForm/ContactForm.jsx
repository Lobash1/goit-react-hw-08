import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
// import { selectContacts } from "../../redux/contacts/slice";
import iziToast from "izitoast";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      "Invalid number. Example: 111-11-11"
    )
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handleSubmit = async (values, actions) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      iziToast.warning({
        title: "Warning",
        message: `${values.name} is already in contacts!`,
        position: "topRight",
      });
      return;
    }

    try {
      await dispatch(addContact(values)).unwrap();
      iziToast.success({
        title: "Success",
        message: `Contact ${values.name} added successfully!`,
        position: "topRight",
      });
      actions.resetForm();
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: `Failed to add contact: ${error.message}`,
        position: "topRight",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <Field className={css.input} id="name" name="name" type="text" />
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.label} htmlFor="number">
          Number
        </label>
        <Field className={css.input} id="number" name="number" type="text" />
        <ErrorMessage className={css.error} name="number" component="span" />

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
