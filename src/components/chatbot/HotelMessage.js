import styles from "./HotelMessage.module.css";
import { NavLink } from "react-router-dom";

const HotelMessage = ({ data }) => {
  return (
    <div className={styles["message"]}>
      <h3>{data.name}</h3>
      <p>{data.info}</p>
      <NavLink to={data.hotel_url}>Подробнее</NavLink>
    </div>
  );
};

export default HotelMessage;
