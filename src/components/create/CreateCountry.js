import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./CreateCountry.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const CreateCountry = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(100, "Название страны не может превышать 100 символов!")
      .required("Название страны не может быть пустым!"),
    description: Yup.string().required("Описание страны не может быть пустым!"),
    visa: Yup.boolean().required("Ну как boolean может быть null?"),
    language: Yup.string()
      .min(2, "Название языка должно быть в пределе от 2 до 50 символов!")
      .max(50, "Название языка должно быть в пределе от 2 до 50 символов!")
      .required("Язык не может быть пустым!"),
    currency: Yup.string()
      .min(2, "Название валюты должно быть от 2 до 50 символов длиной!")
      .max(50, "Название валюты должно быть от 2 до 50 символов длиной!")
      .required("Валюта обязательна для заполнения!"),
    localTime: Yup.string()
      .min(
        5,
        "Часовой пояс должен выглядеть так: UTC+8, при желании можно добавить города!"
      )
      .max(
        50,
        "Часовой пояс должен выглядеть так: UTC+8, при желании можно добавить города!"
      )
      .required("Часовой пояс обязателен для заполнения!"),
    religion: Yup.string()
      .min(3, "Не более 100 символов!")
      .max(100, "Не более 100 символов!")
      .required("Религии страны обязательны для заполнения!"),
    photo: Yup.mixed().required("Фото не может быть пустым!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      visa: false,
      language: "",
      currency: "",
      localTime: "",
      religion: "",
      photo: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("visa", values.visa);
      data.append("language", values.language);
      data.append("currency", values.currency);
      data.append("localTime", values.localTime);
      data.append("religion", values.religion);
      data.append("photo", values.photo);

      try {
        const response = await axios.post(
          "http://localhost:8080/countries/add",
          data
        );
        if (response.status === 200) {
          alert("Страна создана успешно!");
          resetForm();
        }
      } catch (error) {
        console.error("Возникла ошибка при создании страны!", error);
      }
    },
  });

  const isFormValid = () => {
    return Object.values(formik.values).every((value) => value);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Название страны</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.error}>{formik.errors.description}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="visa">Нужна ли виза</label>
          <input
            type="checkbox"
            id="visa"
            name="visa"
            checked={formik.values.visa}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.visa && formik.errors.visa ? (
            <div className={styles.error}>{formik.errors.visa}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="language">Язык</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formik.values.language}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.language && formik.errors.language ? (
            <div className={styles.error}>{formik.errors.language}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="currency">Валюта</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.currency && formik.errors.currency ? (
            <div className={styles.error}>{formik.errors.currency}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="localTime">Местное время</label>
          <input
            type="text"
            id="localTime"
            name="localTime"
            value={formik.values.localTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.localTime && formik.errors.localTime ? (
            <div className={styles.error}>{formik.errors.localTime}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="religion">Религии</label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={formik.values.religion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.religion && formik.errors.religion ? (
            <div className={styles.error}>{formik.errors.religion}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="photo">Фоновое фото для описания страны</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={(event) => {
              formik.setFieldValue("photo", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.photo && formik.errors.photo ? (
            <div className={styles.error}>{formik.errors.photo}</div>
          ) : null}
        </div>
        <button type="submit" className={styles.submitButton}>
          Создать страну
        </button>
      </form>
      <NavLink to="/home" className={styles["home"]}>
        Домой
      </NavLink>
    </div>
  );
};

export default CreateCountry;
