import styles from "./HotelInfoAccordeon.module.css";
import Accordion from "react-bootstrap/Accordion";
import beachIcon from "../../assets/icons/beach.svg";
import infoIcon from "../../assets/icons/info.svg";
import serviceIcon from "../../assets/icons/service.svg";

const HotelInfoAccordeon = (props) => {
  const { beachLine, info, services } = props;
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header className={styles["header-style"]}>
          <h1>Описание отеля</h1>
        </Accordion.Header>
        <Accordion.Body>
          {beachLine !== 0 ? (
            <div className={styles["beach-line"]}>
              <img src={beachIcon} alt="beach" className={styles["beach"]} />
              <p>Пляжная линия: {beachLine}</p>
            </div>
          ) : (
            ""
          )}
          <div className={styles["info-container"]}>
            <div className={styles["info-content"]}>
              <img src={infoIcon} alt="info" className={styles["info-icon"]} />
              <p>{info}</p>
            </div>
          </div>
          <div className={styles["services-container"]}>
            <div className={styles["services-content"]}>
              <img
                src={serviceIcon}
                alt="services"
                className={styles["services-icons"]}
              />
              <p>{services}</p>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default HotelInfoAccordeon;
