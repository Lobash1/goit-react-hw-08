import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.userMenu}>
      <p className={css.email}>👤 {user.email}</p>
      <button className={css.logoutButton} onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
}
