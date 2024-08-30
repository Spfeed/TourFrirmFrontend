import Header from "../home/Header";
import styles from "./HeaderWithCountryTitle.module.css";

const HeaderWithCountryTitle = ({ name }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header-background"]}>
        <Header />
      </div>
      <div className={styles["title-container"]}>
        <p>Страны</p>
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default HeaderWithCountryTitle;
