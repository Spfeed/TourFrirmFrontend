import styles from "./BidsGreetings.module.css";

const BidsGreetings = ({ userName }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <h1 className={styles["header"]}>
          Ознакомьтесь с заявками на туры, {userName}.
        </h1>
        <p className={styles["text"]}>
          Внимательно посмотрите дату создания заявки и ее статус.
        </p>
        <p className={styles["explore"]}>Если обнаружили ошибки</p>
        <p className={styles["text"]}>
          Свяжитесь со своим персональным менеджером или напишите нам на почту.
        </p>
      </div>
    </div>
  );
};

export default BidsGreetings;
