import React from "react";
import styles from "./TourCart.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const TourCart = (props) => {
  const {
    tourId,
    tourName,
    countryName,
    cityName,
    tourImg,
    numAdults,
    numChildren,
    dateStart,
    duration,
    cost,
  } = props;

  let touristsCount = numAdults + " взрослых";

  if (numChildren === 1) {
    touristsCount += " , " + numChildren + " ребёнок";
  } else if (numChildren > 1) {
    touristsCount += " , " + numChildren + " детей";
  }

  return (
    <div className={styles["card-container"]}>
      <img
        className={styles["card-image"]}
        src={`http://localhost:8080/${tourImg}`}
        alt={tourName}
      />
      <div className={styles["card-content"]}>
        <h3 className={styles["card-title"]}>{tourName}</h3>
        <div className={styles["card-description"]}>
          <p>
            {countryName}, {cityName}
          </p>
          <p>{touristsCount}</p>
          <p>
            {dateStart} , {duration} дней
          </p>
        </div>
        <div className={styles["card-footer"]}>
          <span className={styles["card-price "]}>Руб {cost}</span>
          <NavLink className={styles["card-button"]} to={`/tour/${tourId}`}>
            Забронировать
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TourCart;
