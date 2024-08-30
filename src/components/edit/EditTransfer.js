import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./EditTransfer.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const EditTransfer = ({ transferId }) => {
  const { id } = useParams();
  const initialValues = {
    name: "",
    company: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Название вида транспорта не может быть пустым!")
      .min(3, "Название вида транспорта должно быть не менее 3 символов")
      .max(30, "Название вида транспорта должно быть не более 30 символов"),
    company: Yup.string()
      .required("Название компании-перевозчика не должно быть пустым!")
      .min(3, "Название компании-перевозчика должно быть не менее 3 символов")
      .max(
        100,
        "Название компании-перевозчика должно быть не более 100 символов"
      ),
  });

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/transfers/${id}`
        );
        const { name, company } = response.data;
        formik.setValues({ name, company });
      } catch (error) {
        console.error("Error fetching transfer:", error.message);
      }
    };

    fetchTransfer();
  }, [transferId]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/transfers/${transferId}`,
        values
      );

      if (response.status === 200) {
        console.log("Transfer updated successfully!");
      } else {
        throw new Error("Failed to update transfer");
      }
    } catch (error) {
      console.error("Error updating transfer:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={styles.container}>
      <h2>Редактирование трансфера</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.inputField}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="company">Компания:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.inputField}
          />
          {formik.touched.company && formik.errors.company ? (
            <div className={styles.error}>{formik.errors.company}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          Обновить трансфер
        </button>
      </form>
    </div>
  );
};

export default EditTransfer;
