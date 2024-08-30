import styles from "./CreateGuide.module.css";
import infoIcon from "../../assets/icons/info_white.svg";
import travelIcon from "../../assets/icons/travel.svg";
import badgeIcon from "../../assets/icons/badge.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import questionIcon from "../../assets/icons/question.svg";

const CreateGuide = (props) => {
  return (
    <div className={styles["container"]}>
      <h1>Руководство по использованию</h1>
      <div className={styles["guide-content"]}>
        <div className={styles["info-bg"]}>
          <img src={infoIcon} alt="info" />
        </div>
        <div className={styles["guide-text"]}>
          <div className={styles["guide-row"]}>
            <img src={travelIcon} alt="travel" />
            <p>
              Выберите город отбытия, страну и город прибытия. Затем количество
              взрослых и детей. Выберите отель, тип питания и укажите желаемые
              услуги.
            </p>
          </div>
          <div className={styles["guide-row"]}>
            <img src={badgeIcon} alt="badge" />
            <p>
              Проверьте вкладку "Заявки на туры". Там должен отобразиться
              созданный вами тур.
            </p>
          </div>
          <div className={styles["guide-row"]}>
            <img src={phoneIcon} alt="phone" />
            <p>
              Как только тур будет согласован, с вами свяжется персональный
              менеджер для согласования деталей. Статус тура можно проверить в
              строке "Статус заявки".
            </p>
          </div>
          <div className={styles["guide-row"]}>
            <img src={questionIcon} alt="question" />
            <p>
              Остались вопрсы? Обратитесь в службу поддержки через электронную
              почту или звонок.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGuide;
