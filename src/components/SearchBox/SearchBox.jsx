import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  return (
    <div className={css.search}>
      <label htmlFor="search" className={css.label}>
        Find contacts by name
      </label>

      <input
        type="text"
        onChange={(e) => dispatch(setFilter(e.target.value))}
        value={filter}
      />
    </div>
  );
}
