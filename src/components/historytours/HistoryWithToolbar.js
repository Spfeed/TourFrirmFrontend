import Toolbar from "../cabinet/Toolbar";
import HistoryCardWithButton from "./HistoryCardWithButton";
import HistoryGreetings from "./HistoryGreetings";
import styles from "./HistoryWithToolbar.module.css";
import romeImg from "../../assets/rome.jpg";
import budapestImg from "../../assets/budapest.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const HistoryWithToolbar = ({ userName, userId, accessLevel }) => {
  const [toursData, setToursData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/packagetours/${userId}/tourHistory`
        );
        setToursData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [userId]);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < toursData.length; i += 2) {
      rows.push(
        <div key={i} className={styles["history-row"]}>
          <HistoryCardWithButton {...toursData[i]} />
          {toursData[i + 1] && <HistoryCardWithButton {...toursData[i + 1]} />}
        </div>
      );
    }
    return rows;
  };
  return (
    <div className={styles["flexable"]}>
      <Toolbar userId={userId} accessLevel={accessLevel} />
      <div className={styles["content"]}>
        <h1 className={styles["header"]}>История поездок</h1>
        <HistoryGreetings userName={userName} />
        <h1 className={styles["header-history"]}>Ваша история поездок</h1>
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>Ошибка: {error}</p>
        ) : (
          <div className={styles["histories"]}>{renderRows()}</div>
        )}
      </div>
    </div>
  );
};

export default HistoryWithToolbar;
