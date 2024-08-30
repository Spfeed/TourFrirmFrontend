import styles from "./CreationForm.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toastActions } from "../../store/toastSlice";
import axios from "axios";

const CreationForm = ({ userId }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [duration, setDuration] = useState(10);
  const [wishes, setWishes] = useState("");
  const [date, setDate] = useState(getToday());
  const [errors, setErrors] = useState({});
  const [countriesTo, setCountriesTo] = useState(null);
  const [citiesFrom, setCitiesFrom] = useState(null);
  const [citiesTo, setCitiesTo] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [numbers, setNumbers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorsRequest, setErrorsRequest] = useState(null);
  const [selectedCityFrom, setSelectedCityFrom] = useState({
    id: "",
    name: "",
  });
  const [selectedCountry, setSelectedCountry] = useState({ id: "", name: "" });
  const [selectedCityTo, setSelectedCityTo] = useState({
    cityId: "",
    cityName: "",
  });
  const [selectedHotel, setSelectedHotel] = useState({ id: "", name: "" });
  const [selectedNumber, setSelectedNumber] = useState({ id: "", name: "" });
  const [selectedFoodType, setSelectedFoodType] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startCitiesResponse = await axios.get(
          "http://localhost:8080/cities/search-form"
        );
        setCitiesFrom(startCitiesResponse.data);

        const countriesResponse = await axios.get(
          "http://localhost:8080/countries/search-form"
        );
        setCountriesTo(countriesResponse.data);
        if (countriesResponse.data.length > 0) {
          setSelectedCountry(countriesResponse.data[0]);
        }
      } catch (err) {
        setErrorsRequest(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCitiesTo = async () => {
      if (selectedCountry && selectedCountry.id) {
        try {
          const response = await axios.get(
            `http://localhost:8080/countries/${selectedCountry.id}/cities-for-modal`
          );
          setCitiesTo(response.data);
        } catch (err) {
          setErrorsRequest(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCitiesTo();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchHotels = async () => {
      if (selectedCityTo && selectedCityTo.cityId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/cities/hotels/${selectedCityTo.cityId}`
          );
          setHotels(response.data);
        } catch (err) {
          setErrorsRequest(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchHotels();
  }, [selectedCityTo]);

  useEffect(() => {
    const fetchNumbers = async () => {
      if (selectedHotel && selectedHotel.id) {
        try {
          const response = await axios.get(
            `http://localhost:8080/numbers/${selectedHotel.id}/numbersForForm`
          );
          setNumbers(response.data);
        } catch (err) {
          setErrorsRequest(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNumbers();
  }, [selectedHotel]);

  useEffect(() => {
    if (citiesFrom && citiesFrom.length > 0) {
      setSelectedCityFrom(citiesFrom[0]);
    }
  }, [citiesFrom]);

  useEffect(() => {
    if (citiesTo && citiesTo.length > 0) {
      setSelectedCityTo(citiesTo[0]);
    }
  }, [citiesTo]);

  useEffect(() => {
    if (hotels && hotels.length > 0) {
      setSelectedHotel(hotels[0]);
    }
  }, [hotels]);

  useEffect(() => {
    if (numbers && numbers.length > 0) {
      setSelectedNumber(numbers[0]);
    }
  }, [numbers]);

  const handleCountryChange = async (e) => {
    setSelectedCountry({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
    setCitiesTo(null);
    setSelectedCityTo({ cityId: "", cityName: "" });
  };

  const handleCityToChange = async (e) => {
    setSelectedCityTo({
      cityId: e.target.value,
      cityName: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleHotelChange = async (e) => {
    setSelectedHotel({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const history = useHistory();
  const dispatchAction = useDispatch();

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const validateForm = () => {
    const errors = {};

    if (parseInt(adults) < 1 || parseInt(adults) > 5) {
      errors.adults = "Количество взрослых должно быть от 1 до 5";
    }

    if (parseInt(children) < 0 || parseInt(children) > 4) {
      errors.children = "Количество детей должно быть от 0 до 4";
    }

    if (!wishes.trim()) {
      errors.wishes = "Введите ваши пожелания";
    }

    const currentDate = getToday();
    const selectedDate = new Date(date);
    if (selectedDate < currentDate || !date) {
      errors.date = "Выберите корректную дату";
    }

    if (parseInt(duration) < 3 || parseInt(duration) > 100) {
      errors.duration = "Длительность должна быть от 3 до 100 дней";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const data = {
          userId: userId,
          cityStart: selectedCityFrom.id,
          cityEnd: selectedCityTo.cityId,
          numAdults: adults,
          numChildren: children,
          numberId: selectedNumber.id,
          hotelId: selectedHotel.id,
          foodTypeId: selectedFoodType,
          dateStart: date,
          description: wishes,
          duration: duration,
        };

        const response = await axios.post(
          "http://localhost:8080/dynamictours/addTourAndBid",
          data
        );
        dispatchAction(
          toastActions.showToast({
            toastTitle: "Успех",
            toastMessage:
              "Ваш тур был успешно забронирован! Проверьте его статус в личном кабинете.",
          })
        );
        history.push("/home");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFoodTypeChange = (e) => {
    setSelectedFoodType(parseInt(e.target.value)); // обновляем состояние типа питания
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : errorsRequest ? (
          <p>Ошибка: {errorsRequest}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles["form-row"]}>
              {citiesFrom && (
                <div className={styles["input-with-from"]}>
                  <label className={styles["label-text"]} htmlFor="cityFrom">
                    Город отбытия
                  </label>
                  <select
                    className={styles["input-dropdown"]}
                    value={selectedCityFrom.id}
                    id="cityFrom"
                    onChange={(e) =>
                      setSelectedCityFrom({
                        id: e.target.value,
                        name: e.target.options[e.target.selectedIndex].text,
                      })
                    }
                  >
                    {citiesFrom.map((city) => (
                      <option value={city.id} key={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {countriesTo && (
                <div className={styles["input-with-country"]}>
                  <label className={styles["label-text"]} htmlFor="country">
                    Страна прибытия
                  </label>
                  <select
                    className={styles["input-dropdown"]}
                    value={selectedCountry ? selectedCountry.id : ""}
                    id="country"
                    onChange={handleCountryChange}
                  >
                    {countriesTo.map((country) => (
                      <option value={country.id} key={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {citiesTo && (
                <div className={styles["input-with-to"]}>
                  <label className={styles["label-text"]} htmlFor="cityTo">
                    Город прибытия
                  </label>
                  <select
                    className={styles["input-dropdown"]}
                    value={selectedCityTo.id}
                    id="cityTo"
                    onChange={handleCityToChange}
                  >
                    {citiesTo.map((city) => (
                      <option value={city.cityId} key={city.cityId}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["input-with-adults"]}>
                <label className={styles["label-text"]} htmlFor="adults">
                  Количество взрослых
                </label>
                <input
                  type="number"
                  placeholder="2"
                  min={1}
                  id="adults"
                  className={styles["adults-input"]}
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
                {errors.adults && (
                  <p className={styles["error-message"]}>{errors.adults}</p>
                )}
              </div>
              <div className={styles["input-with-children"]}>
                <label className={styles["label-text"]} htmlFor="children">
                  Количество детей
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min={0}
                  id="children"
                  className={styles["children-input"]}
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                />
                {errors.children && (
                  <p className={styles["error-message"]}>{errors.children}</p>
                )}
              </div>
              {hotels && (
                <div className={styles["input-with-hotel"]}>
                  <label className={styles["label-text"]} htmlFor="hotel">
                    Место проживания
                  </label>
                  <select
                    className={styles["input-dropdown"]}
                    value={selectedHotel.id}
                    id="hotel"
                    onChange={handleHotelChange}
                  >
                    {hotels.map((hotel) => (
                      <option value={hotel.id} key={hotel.id}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["food-type"]}>
                <p className={styles["label-text"]}>Тип питания</p>
                <div className={styles["radio-rows"]}>
                  <div className={styles["radio-row"]}>
                    <input
                      id="ai"
                      name="foodtype"
                      type="radio"
                      className={styles["radio"]}
                      value={1}
                      checked={selectedFoodType === 1}
                      onChange={handleFoodTypeChange}
                    />
                    <label className={styles["label-text-radio"]} htmlFor="ai">
                      <span className={styles["custom-radio"]}></span>
                      AI - все включено
                    </label>
                  </div>
                  <div className={styles["radio-row"]}>
                    <input
                      id="bb"
                      type="radio"
                      className={styles["radio"]}
                      name="foodtype"
                      value={2}
                      checked={selectedFoodType === 2}
                      onChange={handleFoodTypeChange}
                    />
                    <label className={styles["label-text-radio"]} htmlFor="bb">
                      <span className={styles["custom-radio"]}></span>
                      BB - только завтраки
                    </label>
                  </div>
                  <div className={styles["radio-row"]}>
                    <input
                      id="fb"
                      type="radio"
                      className={styles["radio"]}
                      name="foodtype"
                      value={3}
                      checked={selectedFoodType === 3}
                      onChange={handleFoodTypeChange}
                    />
                    <label className={styles["label-text-radio"]} htmlFor="fb">
                      <span className={styles["custom-radio"]}></span>
                      FB - трехразовое питание
                    </label>
                  </div>
                  <div className={styles["radio-row"]}>
                    <input
                      id="hb"
                      type="radio"
                      className={styles["radio"]}
                      name="foodtype"
                      value={4}
                      checked={selectedFoodType === 4}
                      onChange={handleFoodTypeChange}
                    />
                    <label className={styles["label-text-radio"]} htmlFor="hb">
                      <span className={styles["custom-radio"]}></span>
                      HB - завтрак и ужин
                    </label>
                  </div>
                  <div className={styles["radio-row"]}>
                    <input
                      id="ro"
                      type="radio"
                      className={styles["radio"]}
                      name="foodtype"
                      value={5}
                      checked={selectedFoodType === 5}
                      onChange={handleFoodTypeChange}
                    />
                    <label className={styles["label-text-radio"]} htmlFor="ro">
                      <span className={styles["custom-radio"]}></span>
                      RO - без питания
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles["description-container"]}>
                <label className={styles["label-text"]} htmlFor="whishes">
                  Ваши пожелания
                </label>
                <textarea
                  id="whishes"
                  className={styles["textarea-whises"]}
                  placeholder="Введите ваши пожелания здесь..."
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                ></textarea>
                {errors.wishes && (
                  <p className={styles["error-message"]}>{errors.wishes}</p>
                )}
              </div>
              <div className={styles["date-duration-container"]}>
                <div className={styles["date-duration-content"]}>
                  <div className={styles["date-content"]}>
                    <label className={styles["label-text"]} htmlFor="date">
                      Дата начала:
                    </label>
                    <input
                      type="date"
                      id="date"
                      className={styles["date-input"]}
                      value={date}
                      min={getToday()}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && (
                      <p className={styles["error-message"]}>{errors.date}</p>
                    )}
                  </div>
                  {numbers && (
                    <div className={styles["input-with-number"]}>
                      <label className={styles["label-text"]} htmlFor="number">
                        Номер
                      </label>
                      <select
                        className={styles["input-dropdown"]}
                        value={selectedHotel.id}
                        id="number"
                        onChange={(e) =>
                          setSelectedHotel({
                            id: e.target.value,
                            name: e.target.options[e.target.selectedIndex].text,
                          })
                        }
                      >
                        {numbers.map((number) => (
                          <option value={number.id} key={number.id}>
                            {number.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className={styles["duration-content"]}>
                    <label className={styles["label-text"]} htmlFor="duration">
                      Длительность:
                    </label>
                    <input
                      type="number"
                      id="duration"
                      min={3}
                      className={styles["children-input"]}
                      placeholder="10"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                    {errors.duration && (
                      <p className={styles["error-message"]}>
                        {errors.duration}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className={styles["create-button"]}>
              Создать тур
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreationForm;
