import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./CreateNumberType.module.css";
import { NavLink } from "react-router-dom";

const CreateNumberType = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Название типа номера обязательно"),
    description: Yup.string().required("Описание типа номера обязательно"),
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
        await axios.post("http://localhost:8080/numberTypes/add", values);
        console.log("Number type added successfully!");
      } catch (error) {
        console.error("Error adding number type:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.createNumberTypeContainer}>
      <h2>Создание типа номера</h2>
      <form
        className={styles.createNumberTypeForm}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.createNumberTypeFormGroup}>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.createNumberTypeInputField}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.createNumberTypeError}>
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className={styles.createNumberTypeFormGroup}>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            className={styles.createNumberTypeTextareaField}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.createNumberTypeError}>
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
      <NavLink to="/home" className={styles.createNumberTypeHomeLink}>
        Домой
      </NavLink>
    </div>
  );
};

export default CreateNumberType;
