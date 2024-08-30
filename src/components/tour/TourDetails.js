import CarouselWithoutText from "../UI/CarouselWithoutText";
import styles from "./TourDetails.module.css";
import landIcon from "../../assets/icons/land.svg";
import takeofIcon from "../../assets/icons/takeof.svg";
import starIcon from "../../assets/icons/star.svg";
import bedIcon from "../../assets/icons/bed.svg";
import foodIcon from "../../assets/icons/food.svg";
import HotelInfoAccordeon from "../UI/HotelInfoAccordeon";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toastActions } from "../../store/toastSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TourDetails = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { tourId } = useParams();

  const [tourInfo, setTourInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const fetchTourInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/packagetours/${tourId}/info`
        );
        setTourInfo(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourInfo();
  }, [tourId]);

  const handleBookButtonClick = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.post(
          "http://localhost:8080/packagetours/createPackageTourBid",
          {
            userId: userId,
            tourId: tourId,
          }
        );

        if (response.status === 200) {
          dispatch(
            toastActions.showToast({
              toastTitle: "Успех",
              toastMessage:
                "Ваш тур был успешно забронирован! Проверьте его статус в личном кабинете.",
            })
          );
          console.log("Dispatched showToast action");
          history.push("/home");
        } else {
          console.log("Ошибка на сервере?");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      dispatch(
        toastActions.showToast({
          toastTitle: "Ошибка",
          toastMessage: "Вы должны быть авторизованы, чтобы забронировать тур",
        })
      );
    }
  };

  if (error) {
    return <p>Произошла ошибка: {error}</p>;
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["header-text"]}>
        <div className={styles["header-text-content"]}>
          <h2>{tourInfo.cityFrom}</h2>
          <img src={takeofIcon} alt="takeof" className={styles["takeof"]} />
          <p className={styles["date"]}>{tourInfo.dateStart}</p>
          <img src={landIcon} alt="landing" className={styles["land"]} />
          <h2 className={styles["destination"]}>
            {tourInfo.cityTo}, {tourInfo.countryTo}
          </h2>
          <p className={styles["duration"]}>{tourInfo.duration} дней</p>
          {tourInfo.numChildren === 0 ? (
            <p className={styles["tourists-count"]}>
              {tourInfo.numAdults} взрослых
            </p>
          ) : tourInfo.numChildren === 1 ? (
            <p className={styles["tourists-count"]}>
              {tourInfo.numAdults} взрослых, 1 ребенок
            </p>
          ) : (
            <p className={styles["tourists-count"]}>
              {tourInfo.numAdults} взрослых, {tourInfo.numChildren} детей
            </p>
          )}
        </div>
      </div>
      <CarouselWithoutText images={tourInfo.hotelPhotos} />
      <div className={styles["hotel-info-container"]}>
        <div className={styles["hotel-name-rating"]}>
          <h1>
            {tourInfo.hotelName} - {tourInfo.hotelRating}
          </h1>
          <img src={starIcon} alt="звезда" className={styles["star-icon"]} />
        </div>
        <div className={styles["number-foodtype"]}>
          <div className={styles["number"]}>
            <img src={bedIcon} alt="номер" />
            <p>{tourInfo.numberName}</p>
          </div>
          <div className={styles["foodtype"]}>
            <img src={foodIcon} alt="еда" />
            <p>{tourInfo.foodType}</p>
          </div>
        </div>
        <div className={styles["hotel-details"]}>
          <HotelInfoAccordeon
            beachLine={tourInfo.beachLine}
            info={tourInfo.hotelInfo}
            services={tourInfo.hotelService}
          />
        </div>
        <div className={styles["tour-services"]}>
          <h1 className={styles["tour-servies-header"]}>
            Услуги, включенные в тур
          </h1>
          <div className={styles["services-container"]}>
            <div className={styles["services-content"]}>
              <ul>
                {tourInfo.tourServices.map((service, index) => (
                  <li key={index} className={styles["service"]}>
                    <div className={styles["round"]} />
                    <p>{service}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button
        id="book-but"
        className={styles["book-button"]}
        onClick={handleBookButtonClick}
      >
        Забронировать
      </button>
    </div>
  );
};

export default TourDetails;
