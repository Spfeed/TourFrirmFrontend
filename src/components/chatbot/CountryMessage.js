import styles from "./CountryMessage.module.css";
import { NavLink } from "react-router-dom";

const CountryMessage = ({ data }) => {
  return (
    <div className={styles["message"]}>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <p>{data.visa}</p>
      <NavLink
        id="country-chatbot-link"
        className={styles["message-country"]}
        to={`${data.country_url}`}
      >
        Подробнее
      </NavLink>
    </div>
  );
};

export default CountryMessage;
