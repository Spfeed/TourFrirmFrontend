import { useState, useEffect } from "react";
import styles from "./FoundToursModal.module.css";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import FoundedTour from "./FoundedTour";
import axios from "axios";

const FoundToursModal = (props) => {
  const { showFoundedModal, handleCloseFoundedModal, foundTours, countryId } =
    props;
  const [toursCount, setToursCount] = useState("");
  const [citiesData, setCitiesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([1, 2, 3, 4, 5]);
  const [aiIsChecked, setAiIsChecked] = useState(true);
  const [bbIsChecked, setBbIsChecked] = useState(true);
  const [fbIsChecked, setFbIsChecked] = useState(true);
  const [hbIsChecked, setHbIsChecked] = useState(true);
  const [roIsChecked, setRoIsChecked] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/countries/${countryId}/cities-for-modal`
        );
        setCitiesData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, [countryId]);

  const handleFoodTypeChange = (foodType, isChecked) => {
    setSelectedFoodTypes((prevSelected) =>
      isChecked
        ? [...prevSelected, foodType]
        : prevSelected.filter((id) => id !== foodType)
    );
  };

  const aiOnClick = () => {
    setAiIsChecked(!aiIsChecked);
    handleFoodTypeChange(1, !aiIsChecked);
  };

  const bbOnClick = () => {
    setBbIsChecked(!bbIsChecked);
    handleFoodTypeChange(2, !bbIsChecked);
  };

  const fbOnClick = () => {
    setFbIsChecked(!fbIsChecked);
    handleFoodTypeChange(3, !fbIsChecked);
  };

  const hbOnClick = () => {
    setHbIsChecked(!hbIsChecked);
    handleFoodTypeChange(4, !hbIsChecked);
  };

  const roOnClick = () => {
    setRoIsChecked(!roIsChecked);
    handleFoodTypeChange(5, !roIsChecked);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    if (foundTours.length === 1) {
      setToursCount(" тур");
    } else {
      setToursCount(" туров");
    }
  }, [foundTours]);

  const filteredToursByCityAndFood = foundTours.filter(
    (tour) =>
      (!selectedCity || tour.cityName === selectedCity) &&
      selectedFoodTypes.includes(tour.foodId)
  );

  return (
    <Modal
      show={showFoundedModal}
      onHide={handleCloseFoundedModal}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles["header-title"]} closeButton>
          {isLoading
            ? "Загрузка, пожалуйста подожите"
            : error
            ? "Ошибка при загрузке данных"
            : `Найдено ${filteredToursByCityAndFood.length} ${toursCount}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Spinner
            animation="border"
            variant="primary"
            className={styles["loading-spinner"]}
          />
        ) : error ? (
          <p>Произошла ошибка при загрузке данных: {error}</p>
        ) : (
          <div className={styles["modal-content"]}>
            <div className={styles["left-panel"]}>
              <select
                className={styles["dropdown"]}
                defaultValue=""
                onChange={handleCityChange}
              >
                <option value="" disabled hidden>
                  Города
                </option>
                {citiesData.map((city) => (
                  <option value={city.cityName} key={city.cityId}>
                    {city.cityName}
                  </option>
                ))}
              </select>
              <div className={styles["food-type"]}>
                <h1>Тип питания</h1>
                <div className={styles["checkboxes-with-text"]}>
                  <div className={styles["checkbox-with-text"]}>
                    <input
                      type="checkbox"
                      className={styles["input-checkbox"]}
                      onChange={aiOnClick}
                      checked={aiIsChecked}
                    />
                    <p>AI - все включено</p>
                  </div>
                  <div className={styles["checkbox-with-text"]}>
                    <input
                      type="checkbox"
                      className={styles["input-checkbox"]}
                      onChange={bbOnClick}
                      checked={bbIsChecked}
                    />
                    <p>BB - только завтрак</p>
                  </div>
                  <div className={styles["checkbox-with-text"]}>
                    <input
                      type="checkbox"
                      className={styles["input-checkbox"]}
                      onChange={fbOnClick}
                      checked={fbIsChecked}
                    />
                    <p>FB - трехразовое питание</p>
                  </div>
                  <div className={styles["checkbox-with-text"]}>
                    <input
                      type="checkbox"
                      className={styles["input-checkbox"]}
                      onChange={hbOnClick}
                      checked={hbIsChecked}
                    />
                    <p>HB - завтраки и ужины</p>
                  </div>
                  <div className={styles["checkbox-with-text"]}>
                    <input
                      type="checkbox"
                      className={styles["input-checkbox"]}
                      onChange={roOnClick}
                      checked={roIsChecked}
                    />
                    <p>RO - без питания</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["devider"]} />
            <div className={styles["founded-tours"]}>
              {filteredToursByCityAndFood.map((tour) => (
                <FoundedTour key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FoundToursModal;
