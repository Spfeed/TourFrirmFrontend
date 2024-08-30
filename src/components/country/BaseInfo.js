import RecomendedTourCard from "../UI/RecomendedTourCard";
import styles from "./BaseInfo.module.css";
import visaIcon from "../../assets/icons/visa.svg";
import languageIcon from "../../assets/icons/language.svg";
import currencyIcon from "../../assets/icons/currency.svg";
import timeIcon from "../../assets/icons/localtime.svg";
import religionIcon from "../../assets/icons/religion.svg";

const BaseInfo = ({
  countryName,
  visaInfo,
  langInfo,
  currencyInfo,
  timeInfo,
  religionInfo,
  tourId,
  tourName,
  numAdults,
  numChildren,
  dateStart,
  duration,
  cost,
  photo,
}) => {
  let visaText = "Для российских туристов требуется виза";

  if (visaInfo === false) {
    visaText = "Для российских туристов виза не требуется";
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <p>{countryName}</p>
        <h1>Основные сведения</h1>
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["content"]}>
          <div className={styles["content-row"]}>
            <div className={styles["content-icon-visa"]}>
              <img src={visaIcon} alt="visa" />
            </div>
            <p>{visaText}</p>
          </div>
          <div className={styles["content-row"]}>
            <div className={styles["content-icon-lang"]}>
              <img src={languageIcon} alt="language" />
            </div>
            <p>{langInfo}</p>
          </div>
          <div className={styles["content-row"]}>
            <div className={styles["content-icon-cur"]}>
              <img src={currencyIcon} alt="currency" />
            </div>
            <p>{currencyInfo}</p>
          </div>
          <div className={styles["content-row"]}>
            <div className={styles["content-icon-time"]}>
              <img src={timeIcon} alt="local time" />
            </div>
            <p>{timeInfo}</p>
          </div>
          <div className={styles["content-row"]}>
            <div className={styles["content-icon-religion"]}>
              <img src={religionIcon} alt="religion" />
            </div>
            <p>{religionInfo}</p>
          </div>
        </div>
        <RecomendedTourCard
          tourId={tourId}
          tourName={tourName}
          numTourists={numAdults}
          numChildren={numChildren}
          dateStart={dateStart}
          duration={duration}
          cost={cost}
          photo={photo}
        />
      </div>
    </div>
  );
};

export default BaseInfo;
