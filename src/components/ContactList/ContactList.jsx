import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "../../redux/contacts/selectors";
import { selectNameFilter } from "../../redux/filters/slice";
import iziToast from "izitoast";

export default function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Фільтрація контактів
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id, name) => {
    try {
      await dispatch(deleteContact(id)).unwrap();
      iziToast.success({
        title: "Deleted",
        message: `Contact ${name} deleted`,
        position: "topRight",
      });
    } catch (err) {
      iziToast.error({
        title: "Error",
        message: `Failed to delete ${name}: ${err.message}`,
        position: "topRight",
      });
    }
  };

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => (
        <Contact
          key={contact.id}
          user={contact}
          onDelete={() => handleDelete(contact.id, contact.name)}
        />
      ))}
    </ul>
  );
}
