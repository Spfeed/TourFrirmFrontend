import TourCart from "../UI/TourCart";
import styles from "./UpcomingOffers.module.css";
import axios from "axios";
import { Fragment, useState, useEffect } from "react";

const UpcomingOffers = () => {
  const [samaraTour, setSamaraTour] = useState(null);
  const [moscowTour, setMoscowTour] = useState(null);
  const [piterTour, setPiterTour] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSamaraTour = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/packagetours/Самара/actual"
        );
        setSamaraTour(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSamaraTour();
  }, []);

  useEffect(() => {
    const fetchMoscowTour = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/packagetours/Москва/actual"
        );
        setMoscowTour(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoscowTour();
  }, []);

  useEffect(() => {
    const fetchPiterTour = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/packagetours/Санкт-Петербург/actual"
        );
        setPiterTour(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPiterTour();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!samaraTour || !moscowTour || !piterTour) {
    return <p>Loading data...</p>;
  }

  return (
    <div className={styles["offers"]}>
      <p className={styles["offers-text"]}>Популярные направления</p>
      <div className={styles.carts}>
        <div>
          <p>Из Самары:</p>
          <TourCart
            tourId={samaraTour.id}
            tourName={samaraTour.name}
            countryName={samaraTour.countryName}
            cityName={samaraTour.cityName}
            tourImg={samaraTour.cityPhoto}
            numAdults={samaraTour.numAdults}
            numChildren={samaraTour.numChildren}
            dateStart={samaraTour.dateStart}
            duration={samaraTour.duration}
            cost={samaraTour.costPack}
          />
        </div>
        <div>
          <p>Из Москвы:</p>
          <TourCart
            tourId={moscowTour.id}
            tourName={moscowTour.name}
            countryName={moscowTour.countryName}
            cityName={moscowTour.cityName}
            tourImg={moscowTour.cityPhoto}
            numAdults={moscowTour.numAdults}
            numChildren={moscowTour.numChildren}
            dateStart={moscowTour.dateStart}
            duration={moscowTour.duration}
            cost={moscowTour.costPack}
          />
        </div>
        <div>
          <p>Из Санкт-Петербурга:</p>
          <TourCart
            tourId={piterTour.id}
            tourName={piterTour.name}
            countryName={piterTour.countryName}
            cityName={piterTour.cityName}
            tourImg={piterTour.cityPhoto}
            numAdults={piterTour.numAdults}
            numChildren={piterTour.numChildren}
            dateStart={piterTour.dateStart}
            duration={piterTour.duration}
            cost={piterTour.costPack}
          />
        </div>
      </div>
    </div>
  );
};

export default UpcomingOffers;
