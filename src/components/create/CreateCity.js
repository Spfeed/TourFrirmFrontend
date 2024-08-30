import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./CreateCity.module.css";
import { NavLink } from "react-router-dom";

const CreateCity = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/countries/search-form"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Название города не должно быть пустым")
      .max(200, "Города с названием более 200 символов не существует"),
    description: Yup.string().required(
      "Описание города обязательно к заполнению"
    ),
    countryId: Yup.number().required("Выберите страну"),
    photos: Yup.array()
      .min(1, "Добавьте хотя бы одну фотографию")
      .required("Фотографии обязательны"),
  });

  const initialValues = {
    name: "",
    description: "",
    countryId: "",
    photos: [], // Начальное значение для файлов
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("countryId", values.countryId);
        values.photos.forEach((photo) => {
          formData.append("photos", photo);
        });

        const response = await fetch("http://localhost:8080/cities/add", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to add city");
        }

        console.log("City added successfully!");
        // Handle success, e.g., redirect or show success message
      } catch (error) {
        console.error("Error adding city:", error);
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
    <div className={styles.createCityContainer}>
      <h2>Создание города</h2>
      <form className={styles.createCityForm} onSubmit={formik.handleSubmit}>
        <div className={styles.createCityFormGroup}>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.createCityInputField}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.createCityError}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className={styles.createCityFormGroup}>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            className={styles.createCityTextareaField}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.createCityError}>
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <div className={styles.createCityFormGroup}>
          <label htmlFor="countryId">Страна:</label>
          <select
            id="countryId"
            name="countryId"
            className={styles.createCityInputField}
            value={formik.values.countryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите страну</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {formik.touched.countryId && formik.errors.countryId ? (
            <div className={styles.createCityError}>
              {formik.errors.countryId}
            </div>
          ) : null}
        </div>

        <div className={styles.createCityFormGroup}>
          <label htmlFor="photos">Фотографии:</label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            accept="image/*"
            className={styles.createCityInputField}
            onChange={(event) => {
              const filesArray = Array.from(event.currentTarget.files);
              formik.setFieldValue("photos", filesArray);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.photos && formik.errors.photos ? (
            <div className={styles.createCityError}>{formik.errors.photos}</div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting || formik.errors.photos}
          className={styles["submit-button"]}
        >
          Отправить
        </button>
      </form>
      <NavLink to="/home" className={styles.createCityHomeLink}>
        Домой
      </NavLink>
    </div>
  );
};

export default CreateCity;
