import styles from "./TourMessage.module.css";
import { NavLink } from "react-router-dom";

const TourMessage = ({ data }) => {
  return (
    <div className={styles["message"]}>
      <h3>{data.name}</h3>
      <p>Туроператор: {data.operator_name}</p>
      <p>Стоимость: {data.cost} рублей</p>
      <p>Откуда: {data.start_city}</p>
      <p>Куда: {data.end_city}</p>
      <p>Дата начала: {data.start_date}</p>
      <p>Количество дней: {data.num_days}</p>
      <NavLink id="tour-url-id" to={data.tour_url}>
        Страница тура
      </NavLink>
    </div>
  );
};

export default TourMessage;
