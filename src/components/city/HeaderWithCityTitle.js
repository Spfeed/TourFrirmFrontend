import styles from "./HeaderWithCityTitle.module.css";
import Header from "../home/Header";

const HeaderWithCityTitle = (props) => {
  const { title } = props;

  return (
    <div className={styles["container"]}>
      <div className={styles["header-background"]}>
        <Header />
      </div>
      <div className={styles["title-container"]}>
        <p>Города</p>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default HeaderWithCityTitle;
