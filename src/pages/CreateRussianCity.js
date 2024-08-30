import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./CreateRussianCity.module.css";
import { NavLink } from "react-router-dom";

const CreateRussianCity = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Название города не должно быть пустым")
      .max(200, "Города с названием более 200 символов не существует"),
    description: Yup.string().required(
      "Описание города обязательно к заполнению"
    ),
    photos: Yup.array()
      .min(1, "Добавьте хотя бы одну фотографию")
      .required("Фотографии обязательны"),
  });

  const initialValues = {
    name: "",
    description: "",
    photos: [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("countryId", 2); // Устанавливаем id=2 для России
        values.photos.forEach((photo) => {
          formData.append("photos", photo);
        });

        await axios.post(
          "http://localhost:8080/cities/addRussianCity",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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

  return (
    <div className={styles.createCityContainer}>
      <h2>Создание города России</h2>
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
          disabled={formik.isSubmitting}
          className={styles.submitButton}
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

export default CreateRussianCity;
