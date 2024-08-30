import styles from "./RecomendedTourCard.module.css";
import { Fragment } from "react";
import recomendIcon from "../../assets/icons/recomend.svg";
import peopleIcon from "../../assets/icons/people.svg";
import calenderIcon from "../../assets/icons/calender.svg";
import costIcon from "../../assets/icons/cost.svg";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const RecomendedTourCard = ({
  tourId,
  tourName,
  numTourists,
  numChildren,
  dateStart,
  duration,
  cost,
  photo,
}) => {
  let numTouristsTitle = numTourists + " взрослых";

  if (numChildren === 1) {
    numTouristsTitle = numTouristsTitle + ", " + numChildren + " ребенок";
  } else if (numChildren > 1) {
    numTouristsTitle = numTouristsTitle + ", " + numChildren + " детей";
  }

  return (
    <div>
      <div className={styles["recomend"]}>
        <img src={recomendIcon} alt="recomend" />
        <p>Рекомендовано</p>
      </div>
      <div className={styles["card"]}>
        <img src={`http://localhost:8080/${photo}`} alt="Tour photo" />
        <h1>{tourName}</h1>
        <div className={styles["info"]}>
          <div className={styles["info-row"]}>
            <div className={styles["info-icon-container"]}>
              <img src={peopleIcon} alt="People" />
            </div>
            <p>{numTouristsTitle}</p>
          </div>
          <div className={styles["info-row"]}>
            <div className={styles["info-icon-container"]}>
              <img src={calenderIcon} alt="Calender" />
            </div>
            <p>
              {dateStart}, {duration} дней
            </p>
          </div>
          <div className={styles["info-row"]}>
            <div className={styles["info-icon-container"]}>
              <img src={costIcon} alt="Cost" />
            </div>
            <p>{cost} рублей</p>
          </div>
        </div>
        <NavLink className={styles["btn"]} to={`/tour/${tourId}`}>
          Забронировать
        </NavLink>
      </div>
    </div>
  );
};

export default RecomendedTourCard;
