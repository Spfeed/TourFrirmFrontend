import Header from "../home/Header";
import styles from "./HeaderWithTourOpsTitle.module.css";

const HeaderWithTourOpsTitle = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header-background"]}>
        <Header />
      </div>
      <h1 className={styles["title"]}>
        Туроператоры, с которыми мы сотрудничаем
      </h1>
    </div>
  );
};

export default HeaderWithTourOpsTitle;
