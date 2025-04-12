import css from "./Contact.module.css";
import { FaPhoneVolume } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import iziToast from "izitoast";

export default function Contact({ user, onDelete }) {
  const handleDelete = () => {
    onDelete(user.id);
    iziToast.success({
      title: "Успіх",
      message: `${user.name} було видалено.`,
      position: "topRight",
    });
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
      <button className={css.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}
