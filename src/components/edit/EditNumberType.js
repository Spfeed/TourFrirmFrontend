import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./EditNumberType.module.css";
import { NavLink, useParams } from "react-router-dom";

const EditNumberType = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Название типа номера обязательно"),
    description: Yup.string().required("Описание типа номера обязательно"),
  });

  const initialValues = {
    name: "",
    description: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/numberTypes/${id}`
        );
        const { name, description } = response.data;

        formik.setValues({
          name,
          description,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.put(`http://localhost:8080/numberTypes/${id}`, values);
        console.log("Number type updated successfully!");
      } catch (error) {
        console.error("Error updating number type:", error);
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
    <div className={styles.editNumberTypeContainer}>
      <h2>Редактирование типа номера</h2>
      <form
        className={styles.editNumberTypeForm}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.editNumberTypeFormGroup}>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.editNumberTypeInputField}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.editNumberTypeError}>
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className={styles.editNumberTypeFormGroup}>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            className={styles.editNumberTypeTextareaField}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.editNumberTypeError}>
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={styles.submitButton}
        >
          Сохранить изменения
        </button>
      </form>
      <NavLink to="/home" className={styles.editNumberTypeHomeLink}>
        Домой
      </NavLink>
    </div>
  );
};

export default EditNumberType;
