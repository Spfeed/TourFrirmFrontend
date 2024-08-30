import styles from "./BigAboutCard.module.css";

const BigAboutCard = (props) => {
  const { officeItems } = props;

  return (
    <div className={styles["container"]}>
      <h1>Контакты</h1>
      <div className={styles["content"]}>
        <div>
          <h2>Наш офис в Самаре:</h2>
          {officeItems.map((item, index) => (
            <div className={styles["content-office"]}>
              <div className={styles["office-round"]}></div>
              <p key={index}>{item}</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Режим работы:</h2>
          <div className={styles["content-regime"]}>
            <p>Понедельник-Пятница:</p>
            <p>10:00-18:00</p>
          </div>
          <div className={styles["content-regime"]}>
            <p>Суббота:</p>
            <p>11:00-17:00</p>
          </div>
          <div className={styles["content-regime"]}>
            <p className={styles["sunday"]}>Воскресенье:</p>
            <p className={styles["sunday"]}>Выходной</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigAboutCard;
