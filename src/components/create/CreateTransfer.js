import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./CreateTransfer.module.css";

const CreateTransfer = () => {
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

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/transfers/add",
        values
      );

      if (response.status === 200) {
        console.log("Transfer created successfully!");
        resetForm();
      } else {
        throw new Error("Failed to create transfer");
      }
    } catch (error) {
      console.error("Error creating transfer:", error.message);
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
      <h2>Создание трансфера</h2>
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
          Создать трансфер
        </button>
      </form>
    </div>
  );
};

export default CreateTransfer;
