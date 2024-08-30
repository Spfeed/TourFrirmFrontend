import TourCart from "../UI/TourCart";
import styles from "./ToursIntoCountry.module.css";

const ToursIntoCountry = (props) => {
  const { tours } = props;
  return (
    <div className={styles["container"]}>
      <h1>Туры:</h1>
      <div className={styles["tours-container"]}>
        {tours.map((tour, index) => (
          <TourCart
            key={index}
            tourId={tour.id}
            tourName={tour.name}
            countryName={tour.countryName}
            cityName={tour.cityName}
            tourImg={tour.cityPhoto}
            numAdults={tour.numAdults}
            numChildren={tour.numChildren}
            dateStart={tour.dateStart}
            duration={tour.duration}
            cost={tour.costPack}
          />
        ))}
      </div>
    </div>
  );
};

export default ToursIntoCountry;
