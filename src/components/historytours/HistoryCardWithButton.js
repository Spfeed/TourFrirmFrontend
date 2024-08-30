import styles from "./HistoryCardWithButton.module.css";
import { useState } from "react";
import HistoryTourModal from "./HistoryTourModal";

const HistoryCardWithButton = ({
  id,
  photo,
  countryName,
  cityName,
  dateStart,
  duration,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <img
          src={`http://localhost:8080/${photo}`}
          alt="image"
          className={styles["image"]}
        />
        <p className={styles["destination"]}>
          {countryName}, {cityName}
        </p>
        <div className={styles["dates-button"]}>
          <p className={styles["dates"]}>
            {dateStart}, {duration} дней
          </p>
          <button className={styles["button"]} onClick={handleShowModal}>
            Подробнее
          </button>
        </div>
      </div>
      <HistoryTourModal
        show={showModal}
        handleClose={handleCloseModal}
        tourId={id}
      />
    </div>
  );
};

export default HistoryCardWithButton;
