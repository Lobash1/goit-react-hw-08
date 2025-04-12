import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.homePage}>
      <h1 className={css.title}>Contact Manager! </h1>
      <h2 className={css.text}>
        Welcome to the Contacts Manager application 💁‍♀️
      </h2>
    </div>
  );
}
