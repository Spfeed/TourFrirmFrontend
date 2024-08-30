import styles from "./TourBid.module.css";
import { useState } from "react";
import axios from "axios";

const TourBid = ({
  tourId,
  userId,
  userEmail,
  countryName,
  cityName,
  timestamp,
  dynaminc,
  accepted,
  accessLevel,
  history,
}) => {
  const [isAccepted, setIsAccepted] = useState(accepted);

  let status = "Принято";
  if (isAccepted === false) {
    status = "На рассмотрении";
  }

  const dyn = dynaminc ? "Динамический" : "Пакетный";

  const handleStatusChange = async (event) => {
    const newStatus = event.target.checked;
    setIsAccepted(newStatus);

    try {
      await axios.put("http://localhost:8080/users/changeTourBidStatus", {
        userId,
        tourId,
        status: newStatus,
        dynamic: dynaminc,
      });
    } catch (error) {
      console.error("Ошибка при изменении статуса заявки:", error);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["destination-dynamic"]}>
          <h1 className={styles["destination"]}>
            {countryName}, {cityName}
          </h1>
          {(accessLevel === "ADMIN" || accessLevel === "MANAGER") && (
            <p className={styles["dynamic"]}>{dyn}</p>
          )}
        </div>
        {(accessLevel === "ADMIN" || accessLevel === "MANAGER") && (
          <div className={styles["status-email"]}>
            <p className={styles["email"]}>{userEmail}</p>
            {!history && (
              <label className={styles["accepted"]}>
                Одобрить:{" "}
                <input
                  type="checkbox"
                  checked={isAccepted}
                  onChange={handleStatusChange}
                />
              </label>
            )}
          </div>
        )}
        <div className={styles["status-timestamp"]}>
          <p className={styles["bid-status"]}>Статус: {status}</p>
          <p className={styles["bid-status"]}>{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default TourBid;
