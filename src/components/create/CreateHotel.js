import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./CreateHotel.module.css";
import { NavLink } from "react-router-dom";

const CreateHotel = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/cities/pc-crud"
        );
        setCities(response.data);
      } catch (error) {
        setError("Failed to fetch cities");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Название отеля не должно быть пустым")
      .max(100, "Название отеля должно быть не более 100 символов"),
    rating: Yup.number()
      .required("Рейтинг отеля обязателен")
      .min(0, "Рейтинг должен быть не менее 0")
      .max(5, "Рейтинг должен быть не более 5"),
    beachLine: Yup.number()
      .required("Укажите расстояние до пляжа")
      .min(1, "Минимальное значение - 1")
      .max(5, "Максимальное значение - 5"),
    information: Yup.string().required("Информация об отеле обязательна"),
    services: Yup.string().required("Список услуг обязателен"),
    cityId: Yup.number().required("Выберите город"),
    photos: Yup.array()
      .min(1, "Добавьте хотя бы одну фотографию")
      .required("Фотографии обязательны"),
  });

  const initialValues = {
    name: "",
    rating: "",
    beachLine: "",
    information: "",
    services: "",
    cityId: "",
    photos: [], // Начальное значение для файлов
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("rating", values.rating);
        formData.append("beachLine", values.beachLine);
        formData.append("information", values.information);
        formData.append("services", values.services);
        formData.append("cityId", values.cityId);
        values.photos.forEach((photo) => {
          formData.append("photos", photo);
        });

        const response = await axios.post(
          "http://localhost:8080/hotels/add",
          formData
        );

        if (response.status !== 200) {
          throw new Error("Failed to add hotel");
        }

        console.log("Hotel added successfully!");
        // Handle success, e.g., redirect or show success message
      } catch (error) {
        console.error("Error adding hotel:", error);
        // Handle error, e.g., show error message to user
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.createHotelContainer}>
      <h2>Создание отеля</h2>
      <form className={styles.createHotelForm} onSubmit={formik.handleSubmit}>
        <div className={styles.createHotelFormGroup}>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.createHotelInputField}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.createHotelError}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className={styles.createHotelFormGroup}>
          <label htmlFor="rating">Рейтинг:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className={styles.createHotelInputField}
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rating && formik.errors.rating ? (
            <div className={styles.createHotelError}>
              {formik.errors.rating}
            </div>
          ) : null}
        </div>

        <div className={styles.createHotelFormGroup}>
          <label htmlFor="beachLine">Расстояние до пляжа:</label>
          <input
            type="number"
            id="beachLine"
            name="beachLine"
            className={styles.createHotelInputField}
            value={formik.values.beachLine}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.beachLine && formik.errors.beachLine ? (
            <div className={styles.createHotelError}>
              {formik.errors.beachLine}
            </div>
          ) : null}
        </div>

        <div className={styles.createHotelFormGroup}>
          <label htmlFor="information">Информация:</label>
          <textarea
            id="information"
            name="information"
            className={styles.createHotelTextareaField}
            value={formik.values.information}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.information && formik.errors.information ? (
            <div className={styles.createHotelError}>
              {formik.errors.information}
            </div>
          ) : null}
        </div>

        <div className={styles.createHotelFormGroup}>
          <label htmlFor="services">Услуги:</label>
          <textarea
            id="services"
            name="services"
            className={styles.createHotelTextareaField}
            value={formik.values.services}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.services && formik.errors.services ? (
            <div className={styles.createHotelError}>
              {formik.errors.services}
            </div>
          ) : null}
        </div>

        <div className={styles.createHotelFormGroup}>
          <label htmlFor="cityId">Город:</label>
          <select
            id="cityId"
            name="cityId"
            className={styles.createHotelInputField}
            value={formik.values.cityId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите город</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {formik.touched.cityId && formik.errors.cityId ? (
            <div className={styles.createHotelError}>
              {formik.errors.cityId}
            </div>
          ) : null}
        </div>

        <div className={styles.createHotelFormGroup}>
          <label htmlFor="photos">Фотографии:</label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            accept="image/*"
            className={styles.createHotelInputField}
            onChange={(event) => {
              const filesArray = Array.from(event.currentTarget.files);
              formik.setFieldValue("photos", filesArray);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.photos && formik.errors.photos ? (
            <div className={styles.createHotelError}>
              {formik.errors.photos}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting || formik.errors.photos}
          className={styles.submitButton}
        >
          Отправить
        </button>
      </form>
      <NavLink to="/home" className={styles.createHotelHomeLink}>
        Домой
      </NavLink>
    </div>
  );
};

export default CreateHotel;
