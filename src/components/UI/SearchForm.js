import { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";
import bigSearchIcon from "../../assets/icons/bigsearch.svg";
import planeIcon from "../../assets/icons/plane.svg";
import FoundToursModal from "./FoundToursModal";
import axios from "axios";

const SearchForm = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [daysValue, setDaysValue] = useState(3);
  const [adultsValue, setAdultsValue] = useState(2);
  const [childrenValue, setChildrenValue] = useState(0);
  const [errors, setErrors] = useState({});

  const [showFoundedToursModal, setShowFoundedToursModal] = useState(false);

  const handleShowFoundedToursModal = () => setShowFoundedToursModal(true);
  const handleCloseFoundedToursModal = () => setShowFoundedToursModal(false);

  const [citiesFrom, setCitiesFrom] = useState([]);
  const [countriesTo, setCountriesTo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorRequest, setErrorRequest] = useState(null);
  const [errorPostRequest, setErrorPostRequest] = useState(null);

  const [foundTours, setFoundTours] = useState([]);

  useEffect(() => {
    const fetchCitiesFrom = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/cities/search-form"
        );
        setCitiesFrom(response.data);
        setFromValue(response.data[0]?.id || "");
      } catch (err) {
        setErrorRequest(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCitiesFrom();
  }, []);

  useEffect(() => {
    const fetchCountriesTo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/countries/search-form"
        );
        setCountriesTo(response.data);
        setToValue(response.data[0]?.id || "");
      } catch (err) {
        setErrorRequest(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountriesTo();
  }, []);

  const handleFromChange = (event) => {
    setFromValue(event.target.value);
  };

  const handleToChange = (event) => {
    setToValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDaysValue(Number(event.target.value));
  };

  const handleAdultsChange = (event) => {
    setAdultsValue(Number(event.target.value));
  };

  const handleChildrenChange = (event) => {
    setChildrenValue(Number(event.target.value));
  };

  const validateForm = () => {
    const errors = {};

    const today = new Date().toISOString().substring(0, 10);
    if (!dateValue || dateValue < today) {
      errors.date = "Дата вылета должна быть не раньше сегодняшнего дня";
    }

    if (!daysValue || daysValue < 3 || daysValue > 100) {
      errors.days = "Количество дней должно быть от 3 до 100";
    }

    if (!adultsValue || adultsValue < 1 || adultsValue > 5) {
      errors.adults = "Количество взрослых должно быть от 1 до 5";
    }

    if (childrenValue < 0 || childrenValue > 4) {
      errors.children = "Количество детей должно быть от 0 до 4";
    }

    return errors;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:8080/packagetours/search",
        {
          fromId: fromValue,
          toId: toValue,
          startDate: dateValue,
          days: daysValue,
          adults: adultsValue,
          children: childrenValue,
        }
      );
      setFoundTours(response.data);
      handleShowFoundedToursModal();
    } catch (err) {
      setErrorPostRequest(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (errorRequest) {
    return <p>{errorRequest}</p>;
  }

  if (errorPostRequest) {
    return <p>{errorPostRequest}</p>;
  }

  if (loading) {
    return <p>загрузка...</p>;
  }

  if (!citiesFrom.length || !countriesTo.length) {
    return <p>загрузка...</p>;
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={styles["form-button-inline"]}>
        <div className={styles["form-container"]}>
          <div>
            <div className={styles["form-row"]}>
              <div className={styles["from-where-rect"]}>
                <div className={styles["from-where-content"]}>
                  <div className={styles["form-first-row"]}>
                    <label htmlFor="from">Откуда:</label>
                    <select
                      id="from"
                      value={fromValue}
                      onChange={handleFromChange}
                    >
                      {citiesFrom.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <img src={planeIcon} alt="Перелет" />
                  <div className={styles["form-first-row"]}>
                    <label htmlFor="to">Куда:</label>
                    <select id="to" value={toValue} onChange={handleToChange}>
                      {countriesTo.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles["date-days-rect"]}>
                <div className={styles["date-days-content"]}>
                  <div className={styles["date-content"]}>
                    <label htmlFor="date">Дата вылета:</label>
                    <input
                      type="date"
                      id="date"
                      value={dateValue}
                      onChange={handleDateChange}
                      min={new Date().toISOString().substring(0, 10)}
                    />
                    {errors.date && (
                      <span className={styles.error}>{errors.date}</span>
                    )}
                  </div>
                  <div className={styles["days-content"]}>
                    <label htmlFor="days">Количество дней:</label>
                    <input
                      type="number"
                      id="days"
                      value={daysValue}
                      onChange={handleDaysChange}
                      min="3"
                      max="100"
                    />
                    {errors.days && (
                      <span className={styles.error}>{errors.days}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["adults-chilren-rect"]}>
                <div className={styles["adults-children-content"]}>
                  <div className={styles["adults-content"]}>
                    <label htmlFor="adults">Количество взрослых:</label>
                    <input
                      type="number"
                      id="adults"
                      value={adultsValue}
                      onChange={handleAdultsChange}
                      min="1"
                      max="5"
                    />
                    {errors.adults && (
                      <span className={styles.error}>{errors.adults}</span>
                    )}
                  </div>
                  <div className={styles["children-content"]}>
                    <label htmlFor="children">Количество детей:</label>
                    <input
                      type="number"
                      id="children"
                      value={childrenValue}
                      onChange={handleChildrenChange}
                      min="0"
                      max="4"
                    />
                    {errors.children && (
                      <span className={styles.error}>{errors.children}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["search-rectangle"]}>
          <button id="search-button" type="submit">
            <img src={bigSearchIcon} alt="Поиск" />
          </button>
        </div>
      </div>
      <FoundToursModal
        showFoundedModal={showFoundedToursModal}
        handleCloseFoundedModal={handleCloseFoundedToursModal}
        foundTours={foundTours}
        countryId={toValue}
      />
    </form>
  );
};

export default SearchForm;
