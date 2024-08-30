import styles from "./BidsWithToolbar.module.css";
import Toolbar from "../cabinet/Toolbar";
import BidsGreetings from "./BidsGreetings";
import TourBid from "./TourBid";
import { useState, useEffect } from "react";
import axios from "axios";

const BidsWithToolbar = ({ userName, userId, accessLevel, history }) => {
  const [bids, setBids] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [errorUserData, setErrorUserData] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        let response;
        if (accessLevel === "USER") {
          response = await axios.get(
            `http://localhost:8080/users/${userId}/bids`
          );
        } else {
          if (history) {
            response = await axios.get(
              `http://localhost:8080/users/getAllBidsAccepted`
            );
          } else {
            response = await axios.get(
              `http://localhost:8080/users/getAllBidsToAccept`
            );
          }
        }
        setBids(response.data);
      } catch (err) {
        setErrorUserData(err.message);
      } finally {
        setLoadingUserData(false);
      }
    };
    fetchBids();
  }, [userId, accessLevel, history]);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < bids.length; i += 2) {
      rows.push(
        <div key={i} className={styles["bids-row"]}>
          <TourBid {...bids[i]} accessLevel={accessLevel} history={history} />
          {bids[i + 1] && (
            <TourBid
              {...bids[i + 1]}
              accessLevel={accessLevel}
              history={history}
            />
          )}
        </div>
      );
    }
    return rows;
  };
  return (
    <div className={styles["flexable"]}>
      <Toolbar userId={userId} accessLevel={accessLevel} />
      <div className={styles["content"]}>
        <h1 className={styles["header"]}>Заявки на туры</h1>
        <BidsGreetings userName={userName} />
        <h1 className={styles["header-bids"]}>Заявки на туры</h1>
        {loadingUserData ? (
          <p>Загрузка...</p>
        ) : errorUserData ? (
          <p>Ошибка: {errorUserData}</p>
        ) : (
          <div className={styles["bids"]}>{renderRows()}</div>
        )}
      </div>
    </div>
  );
};

export default BidsWithToolbar;
