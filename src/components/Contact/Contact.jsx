import css from "./Contact.module.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import iziToast from "izitoast";

export default function Contact({ user }) {
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

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

  return (
    <li className={css.item}>
      <div className={css.contact}>
        <div className={css.info}>
          <BsFillPeopleFill />
          <p>{user.name}</p>
        </div>
        <div className={css.info}>
          <FaPhoneVolume />
          <p>{user.number}</p>
        </div>
      </div>
      <button
        className={css.deleteBtn}
        onClick={() => handleDelete(user.id, user.name)}
      >
        Delete
      </button>
    </li>
  );
}
