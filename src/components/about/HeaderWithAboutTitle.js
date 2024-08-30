import Header from "../home/Header";
import styles from "./HeaderWithAboutTitle.module.css";

const HeaderWithAboutTitle = (props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header-background"]}>
        <Header />
      </div>
      <h1 className={styles["about-title"]}>О нас</h1>
    </div>
  );
};

export default HeaderWithAboutTitle;
