import styles from "./FoundedTour.module.css";
import starIcon from "../../assets/icons/star.svg";
import budapestImg from "../../assets/budapest.jpg";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const FoundedTour = ({ tour }) => {
  const {
    id,
    name,
    cityName,
    hotelName,
    hotelRating,
    costPack,
    cityPhoto,
    dateStart,
    duration,
    foodId,
  } = tour;

  return (
    <div className={styles["founded-tour"]}>
      <div className={styles["founded-tour-content"]}>
        <img
          src={`http://localhost:8080/${cityPhoto}`}
          alt="tour photo"
          className={styles["tour-img"]}
        />
        <div className={styles["founded-tour-info"]}>
          <h2>{name}</h2>
          <div className={styles["city-hotel"]}>
            <p>{`${cityName}, ${hotelName} - ${hotelRating}`}</p>
            <img src={starIcon} alt="звезд" />
          </div>
          <p>Цена: {costPack}</p>
        </div>
        <div>
          <div className={styles["date-duration"]}>
            <p>{dateStart}</p>
            <p>{duration} дней</p>
          </div>
          <NavLink
            id="details-nav"
            className={styles["details-button"]}
            to={`/tour/${id}`}
          >
            Подробнее
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FoundedTour;
