import { Fragment } from "react";
import styles from "./HistoryTourModal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const HistoryTourModal = ({ show, handleClose, tourId }) => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/packagetours/${tourId}/historyInfo`
        );
        setTour(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [tourId]);

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className={styles["modal-header"]}>
          <Modal.Title>Информация о туре</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p>Ошибка: {error}</p>
          ) : (
            <div className={styles["modal-content"]}>
              <h1>{tour.tourName}</h1>
              <div className={styles["content"]}>
                <div className={styles["content-container"]}>
                  <p>Откуда, куда, дата выезда, продолжительность:</p>
                  <ul>
                    <li>Откуда: {tour.cityStart};</li>
                    <li>Куда: {tour.cityEnd};</li>
                    <li>Дата начала: {tour.dateStart};</li>
                    <li>продолжительность: {tour.duration};</li>
                  </ul>
                </div>
                <div className={styles["content-container"]}>
                  <p>Количество туристов:</p>
                  <ul>
                    <li>Взрослые: {tour.numAdults};</li>
                    <li>Дети: {tour.numChildren};</li>
                  </ul>
                </div>
                <div className={styles["content-container"]}>
                  <p>Размещение:</p>
                  <ul>
                    <li>Отель: {tour.hotelName};</li>
                    <li>Номер: {tour.numberName};</li>
                    <li>Питание: {tour.foodTypeName};</li>
                  </ul>
                </div>
                <div className={styles["content-container"]}>
                  <p>Туроператор, трансфер:</p>
                  <ul>
                    <li>Туроператор: {tour.tourOp};</li>
                    <li>Компания-перевозчик: {tour.transfer};</li>
                  </ul>
                </div>
                <div className={styles["content-container"]}>
                  <p>Услуги, включенные в тур:</p>
                  <ul>
                    {tour.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default HistoryTourModal;
