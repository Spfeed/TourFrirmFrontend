import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./CityMessage.module.css";

const CityMessage = ({ data }) => {
  return (
    <div className={styles["message"]}>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <NavLink to={data.city_url}>Подробнее</NavLink>
    </div>
  );
};

export default CityMessage;
