import styles from "./HistoryCard.module.css";

const HistoryCard = (props) => {
  const { image, country, city, date, duration } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <img
          src={`http://localhost:8080/${image}`}
          alt="image"
          className={styles["image"]}
        />
        <p className={styles["destination"]}>
          {country}, {city}
        </p>
        <p className={styles["dates"]}>
          {date}, {duration} дней
        </p>
      </div>
    </div>
  );
};

export default HistoryCard;
