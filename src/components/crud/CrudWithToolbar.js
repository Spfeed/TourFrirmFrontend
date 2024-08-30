import Toolbar from "../cabinet/Toolbar";
import CrudModal from "./CrudModal";
import styles from "./CrudWithToolbar.module.css";
import { useState } from "react";

const CrudWithToolbar = ({ userId, accessLevel }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

  const handleShowModal = (modalUrl) => {
    setModalUrl(modalUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  return (
    <div className={styles["flexable"]}>
      <Toolbar userId={userId} accessLevel={accessLevel} />
      <div className={styles["content"]}>
        <h1 className={styles["header"]}>Создание/Редактирование/Удаление</h1>
        <div className={styles["row"]}>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Страны</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/countries/search-form")}
            >
              Смотреть
            </button>
          </div>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Города</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/cities/pc-crud")}
            >
              Смотреть
            </button>
          </div>
        </div>
        <div className={styles["row"]}>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Туроператоры</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/touroperators/pc-crud")}
            >
              Смотреть
            </button>
          </div>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Перевозчики</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/transfers/pc-crud")}
            >
              Смотреть
            </button>
          </div>
        </div>
        <div className={styles["row"]}>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Отели</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/hotels/pc-crud")}
            >
              Смотреть
            </button>
          </div>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Номера</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/numbers/pc-crud")}
            >
              Смотреть
            </button>
          </div>
        </div>
        <div className={styles["row"]}>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Типы номеров</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/numberTypes/pc-crud")}
            >
              Смотреть
            </button>
          </div>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Услуги</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/services/pc-crud")}
            >
              Смотреть
            </button>
          </div>
        </div>
        <div className={styles["row"]}>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Города России</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/cities/search-form")}
            >
              Смотреть
            </button>
          </div>
          <div className={styles["info-btn-container"]}>
            <p className={styles["category"]}>Пакетные туры</p>
            <button
              className={styles["watch-button"]}
              onClick={() => handleShowModal("/packagetours/pc-crud")}
            >
              Смотреть
            </button>
          </div>
        </div>
      </div>
      <CrudModal
        show={showModal}
        handleClose={handleCloseModal}
        contentUrl={modalUrl}
      />
    </div>
  );
};

export default CrudWithToolbar;
