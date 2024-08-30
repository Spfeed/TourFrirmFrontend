import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./TourOperatorMessage.module.css";

const TourOperatorMessage = ({ data }) => {
  return (
    <div className={styles["message"]}>
      <h3>{data.name}</h3>
      <p>{data.info}</p>
      <p>Рейтинг: {data.rating}/5</p>
      <a href={data.site_url}>Сайт</a>
      <br />
      <NavLink to={data.operators_url}>Подробнее</NavLink>
    </div>
  );
};

export default TourOperatorMessage;
