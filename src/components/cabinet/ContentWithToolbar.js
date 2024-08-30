import styles from "./ContentWithToolbar.module.css";
import Greetings from "./Greetings";
import Toolbar from "./Toolbar";
import romeImg from "../../assets/rome.jpg";
import budapestImg from "../../assets/budapest.jpg";
import HistoryCard from "./HistoryCard";
import BidCard from "./BidCard";
import ChatWithSupport from "./ChatWithSupport";
import axios from "axios";
import { useState, useEffect } from "react";

const ContentWithToolbar = ({ userName, userId, accessLevel }) => {
  const [toursData, setToursData] = useState(null);
  const [toursLoading, setToursLoading] = useState(true);
  const [errorTours, setErrorTours] = useState(null);
  const [bidsData, setBidsData] = useState(null);
  const [bidsLoading, setBidsLoading] = useState(true);
  const [errorBids, setErrorBids] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/packagetours/${userId}/tourMain`
        );
        setToursData(response.data);
        console.log(toursData);
      } catch (err) {
        setErrorTours(err.message);
        console.log(errorTours);
      } finally {
        setToursLoading(false);
      }
    };
    fetchTours();
  }, [userId]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}/bids`
        );
        setBidsData(response.data);
      } catch (err) {
        setErrorBids(err.message);
      } finally {
        setBidsLoading(false);
      }
    };
    fetchBids();
  }, [userId]);

  return (
    <div className={styles["flexable"]}>
      <Toolbar userId={userId} accessLevel={accessLevel} />
      <div className={styles["content"]}>
        <h1 className={styles["header"]}>Домашняя страница</h1>
        <Greetings userName={userName} />
        <h1 className={styles["header-history"]}>История поездок</h1>
        <div className={styles["history-conatiner"]}>
          {toursLoading ? (
            <p>Загрузка...</p>
          ) : errorTours ? (
            <p>Ошибка: {errorTours}</p>
          ) : (
            toursData.map((tour, index) => (
              <HistoryCard
                key={index}
                image={tour.photo}
                country={tour.countryName}
                city={tour.cityName}
                date={tour.dateStart}
                duration={tour.duration}
              />
            ))
          )}
        </div>
        <h1 className={styles["header-bids"]}>Заявки на туры</h1>
        <div className={styles["bids-container"]}>
          {bidsLoading ? (
            <p>Загрузка...</p>
          ) : errorBids ? (
            <p>Ошибка: {errorBids}</p>
          ) : (
            bidsData
              .slice(0, 2)
              .map((bid, index) => (
                <BidCard
                  key={index}
                  country={bid.countryName}
                  city={bid.cityName}
                  status={bid.accepted ? "принято" : "на рассмотрении"}
                />
              ))
          )}
        </div>
        <h1 className={styles["header-bids"]}>Чат с поддержкой</h1>
        <ChatWithSupport />
      </div>
    </div>
  );
};

export default ContentWithToolbar;
