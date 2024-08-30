import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styles from "./HistoryGreetings.module.css";

const HistoryGreetings = ({ userName }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <h1 className={styles["header"]}>
          Ознакомьтесь с историей поездок, {userName}!
        </h1>
        <p className={styles["text"]}>
          Если вам понравился тур и вы хотите поделиться впечатлением, то можете
          отправить отзыв нам на почту!
        </p>
        <p className={styles["explore"]}>Почта</p>
        <p className={styles["text"]}>subbart2266@gmail.com</p>
      </div>
    </div>
  );
};

export default HistoryGreetings;
