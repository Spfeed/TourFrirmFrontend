import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styles from "./Greetings.module.css";

const Greetings = ({ userName }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <h1 className={styles["header"]}>Добро пожаловать, {userName}!</h1>
        <p className={styles["text"]}>
          Ознакомьтесь с историей поездок или проверьте статус заявок.
        </p>
        <p className={styles["explore"]}>
          Ознакомьтесь с большим количеством туров
        </p>
        <NavLink to="/home" className={styles["explore-button"]}>
          Ознакомиться
        </NavLink>
      </div>
    </div>
  );
};

export default Greetings;
