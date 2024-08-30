import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./CreateService.module.css";
import { NavLink } from "react-router-dom";

const CreateService = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Название услуги обязательно"),
    description: Yup.string().required("Описание услуги обязательно"),
  });

  const initialValues = {
    name: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post("http://localhost:8080/services/add", values);
        console.log("Service added successfully!");
      } catch (error) {
        console.error("Error adding service:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.createServiceContainer}>
      <h2>Создание услуги</h2>
      <form className={styles.createServiceForm} onSubmit={formik.handleSubmit}>
        <div className={styles.createServiceFormGroup}>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.createServiceInputField}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.createServiceError}>
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className={styles.createServiceFormGroup}>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            className={styles.createServiceTextareaField}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.createServiceError}>
              {formik.errors.description}
            </div>
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
      <NavLink to="/home" className={styles.createServiceHomeLink}>
        Домой
      </NavLink>
    </div>
  );
};

export default CreateService;
