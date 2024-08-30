import styles from "./TourOpeatorCard.module.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const TourOpeatorCard = (props) => {
  const {
    tourOperTitle,
    imgRef,
    tourOperRating,
    tourOperLink,
    tourOperDescription,
  } = props;
  return (
    <div className={styles["container"]}>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className={styles["tabs"]}
      >
        <Tab
          eventKey="home"
          title="Базовая информация"
          className={styles["tab"]}
        >
          <div className={styles["tab-content"]}>
            <img src={imgRef} alt="tourop logo" />
            <div>
              <h2>{tourOperTitle}</h2>
              <p>{tourOperRating}/5</p>
              <a href={`https://${tourOperLink}`}>{tourOperLink}</a>
            </div>
          </div>
        </Tab>
        <Tab eventKey="description" title="Описание" className={styles["tab"]}>
          <p className={styles["description-text"]}>{tourOperDescription}</p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TourOpeatorCard;
