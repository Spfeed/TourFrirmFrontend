import { Fragment } from "react";
import styles from "./CrudModal.module.css";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete.svg";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import createIcon from "../../assets/icons/create.svg";

const CrudModal = ({ show, handleClose, contentUrl }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createUrl, setCreateUrl] = useState("");
  const [editUrl, setEditUrl] = useState("");

  useEffect(() => {
    if (contentUrl === "/countries/search-form") {
      setCreateUrl("/countries/create");
      setEditUrl("/countries/edit");
    } else if (contentUrl === "/cities/pc-crud") {
      setCreateUrl("/cities/create");
      setEditUrl("/cities/edit");
    } else if (contentUrl === "/touroperators/pc-crud") {
      setCreateUrl("/touroperators/create");
      setEditUrl("/touroperators/edit");
    } else if (contentUrl === "/transfers/pc-crud") {
      setCreateUrl("/transfers/create");
      setEditUrl("/transfers/edit");
    } else if (contentUrl === "/hotels/pc-crud") {
      setCreateUrl("/hotels/create");
      setEditUrl("/hotels/edit");
    } else if (contentUrl === "/numbers/pc-crud") {
      setCreateUrl("/numbers/create");
      setEditUrl("/numbers/edit");
    } else if (contentUrl === "/numberTypes/pc-crud") {
      setCreateUrl("/numberTypes/create");
      setEditUrl("/numberTypes/edit");
    } else if (contentUrl === "/services/pc-crud") {
      setCreateUrl("/services/create");
      setEditUrl("/services/edit");
    } else if (contentUrl === "/cities/search-form") {
      setCreateUrl("/russianCities/create");
      setEditUrl("/russianCities/edit");
    } else if (contentUrl === "/packagetours/pc-crud") {
      setCreateUrl("/packagetours/create");
      setEditUrl("/packagetours/edit");
    }
  }, [contentUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080${contentUrl}`);
        setContent(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (show) {
      // Загружать данные только при открытии модального окна
      fetchData();
    }
  }, [contentUrl, show]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080${contentUrl}/${id}`);
      // Удаление элемента из состояния после успешного удаления
      setContent(content.filter((item) => item.id !== id));
    } catch (err) {
      setError(`Ошибка при удалении: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body>
          <div className={styles["modal-content"]}>Загрузка...</div>
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body>
          <div className={styles["modal-content"]}>Ошибка: {error}</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body>
          <div className={styles["modal-content"]}>
            {content.map((item, index) => (
              <div className={styles["modal-container"]}>
                {item.name ? (
                  <p className={styles["modal-name"]}>{item.name}</p>
                ) : (
                  <p className={styles["modal-name"]}>
                    {item.hotelName} - {item.numberTypeName}
                  </p>
                )}
                <NavLink
                  to={`${editUrl}/${item.id}`}
                  className={styles["edit-button"]}
                >
                  Редактировать
                </NavLink>
                <div className={styles["delete-button"]}>
                  <img
                    className={styles["bin"]}
                    src={deleteIcon}
                    alt="Удалить"
                  />
                  <button
                    className={styles["delete-text"]}
                    onClick={() => handleDelete(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
            <div className={styles["create-button"]}>
              <img
                src={createIcon}
                className={styles["create-icon"]}
                alt="Создать"
              />
              <NavLink to={createUrl} className={styles["create-text"]}>
                Создать
              </NavLink>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default CrudModal;
