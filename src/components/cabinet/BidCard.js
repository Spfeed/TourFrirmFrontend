import styles from "./BidCard.module.css";

const BidCard = (props) => {
  const { country, city, status } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <h1 className={styles["destination"]}>
          {country}, {city}
        </h1>
        <p className={styles["bid-status"]}>Статус: {status}</p>
      </div>
    </div>
  );
};

export default BidCard;
