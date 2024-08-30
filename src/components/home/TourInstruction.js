import styles from "./TourInstruction.module.css";
import mapIcon from "../../assets/icons/map.svg";
import contactIcon from "../../assets/icons/manager.svg";
import baggageIcon from "../../assets/icons/baggage.svg";
import dubaiImg from "../../assets/dubai.jpg";
import desertIcon from "../../assets/icons/desert.svg";
import beachIcon from "../../assets/icons/beach.svg";
import moneyIcon from "../../assets/icons/money.svg";
import fireIcon from "../../assets/icons/fire.svg";
import seishelyImg from "../../assets/seishely.jpeg";
import { useState } from "react";
import TouristNoticeModal from "../touristnotice/TouristNoticeModal";

const TourInstruction = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles["text-card"]}>
      <div className={styles["container"]}>
        <p className={styles["easy-and-fast"]}>Легко и быстро</p>
        <div className={styles["plan-trip"]}>
          <p>Спланируйте поездку</p>
          <p>В 3 простых шага</p>
        </div>
        <div className={styles["steps-container"]}>
          <div className={styles["step-container"]}>
            <div className={styles["map-rect"]}>
              <img src={mapIcon} alt="Карта" className={styles["map-img"]} />
            </div>
            <div>
              <p className={styles["point"]}>Выберите тур</p>
              <div className={styles["text-under-point"]}>
                <p>Вы можете выбрать любой тур из доступных</p>
                <p>или спланировать свой.</p>
              </div>
            </div>
          </div>
          <div className={styles["step-container"]}>
            <div className={styles["contact-rect"]}>
              <img
                src={contactIcon}
                alt="Менеджер"
                className={styles["contact-img"]}
              />
            </div>
            <div>
              <p className={styles["point"]}>Дождитесь ответа</p>
              <div className={styles["text-under-point"]}>
                <p>Менеджер свяжется с вами для уточнения</p>
                <p>и согласования деталей поездки.</p>
              </div>
            </div>
          </div>
          <div className={styles["step-container"]}>
            <div className={styles["bag-rect"]}>
              <img
                src={baggageIcon}
                alt="Чемодан"
                className={styles["bag-img"]}
              />
            </div>
            <div>
              <p className={styles["point"]}>Пакуйте вещи</p>
              <div className={styles["text-under-point"]}>
                <p>
                  Ознакомьтесь с{" "}
                  <button
                    onClick={handleShowModal}
                    className={styles["notice-button"]}
                  >
                    памяткой туриста.
                  </button>
                </p>
                <p>Прибудьте в аэропорт в назанченную дату,</p>
                <p>обязательно возьмите все документы.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card-container"]}>
        <div className={styles["card-blur"]}></div>
        <div className={styles["card-rect"]}>
          <div className={styles["card-content"]}>
            <img src={dubaiImg} alt="Дубай" className={styles["card-img"]} />
            <div className={styles["card-text-block"]}>
              <p className={styles["tour-name"]}>Тур в ОАЭ</p>
              <p className={styles["tour-dates"]}>14-29 Июня</p>
              <div className={styles["tour-icons"]}>
                <div className={styles["tour-icon-rect"]}>
                  <img src={desertIcon} alt="Пустыня" />
                </div>
                <div className={styles["tour-icon-rect"]}>
                  <img src={beachIcon} alt="Пустыня" />
                </div>
                <div className={styles["tour-icon-rect"]}>
                  <img src={moneyIcon} alt="Пустыня" />
                </div>
              </div>
              <div className={styles["tour-footer"]}>
                <img src={fireIcon} alt="Популярный" />
                <p>Популярное направление</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["micro-card"]}>
          <div className={styles["micro-card-content"]}>
            <img src={seishelyImg} alt="Сейшелы" />
            <div className={styles["micro-card-text"]}>
              <p className={styles["micro-card-text-later"]}>Скоро</p>
              <p className={styles["micro-card-text-name"]}>Тур на Сейшелы</p>
              <div className={styles["micro-card-load-text"]}>
                <p className={styles["micro-card-percent"]}>40%</p>
                <p className={styles["micro-card-load-ready"]}>готово</p>
              </div>
              <div className={styles["micro-card-load"]}>
                <div className={styles["micro-card-load-full"]}></div>
                <div className={styles["micro-card-load-empty"]}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TouristNoticeModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default TourInstruction;
