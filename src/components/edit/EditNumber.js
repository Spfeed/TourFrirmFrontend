import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./EditNumber.module.css";
import { NavLink, useParams } from "react-router-dom";

const EditNumber = () => {
  const { id } = useParams();
  const [hotels, setHotels] = useState([]);
  const [numberTypes, setNumberTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelsResponse = await axios.get(
          "http://localhost:8080/hotels/pc-crud"
        );
        const numberTypesResponse = await axios.get(
          "http://localhost:8080/numberTypes/pc-crud"
        );

        setHotels(hotelsResponse.data);
        setNumberTypes(numberTypesResponse.data);

        const numberResponse = await axios.get(
          `http://localhost:8080/numbers/${id}`
        );
        const { hotelId, numberTypeId, description } = numberResponse.data;

        formik.setValues({
          hotelId,
          numberTypeId,
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

  const validationSchema = Yup.object().shape({
    hotelId: Yup.number().required("Выберите отель"),
    numberTypeId: Yup.number().required("Выберите тип номера"),
    description: Yup.string().required(
      "Описание номера обязательно к заполнению"
    ),
  });

  const initialValues = {
    hotelId: "",
    numberTypeId: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.put(`http://localhost:8080/numbers/${id}`, values);
        console.log("Number updated successfully!");
      } catch (error) {
        console.error("Error updating number:", error);
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
    <div className={styles.createNumberContainer}>
      <h2>Редактирование номера</h2>
      <form className={styles.createNumberForm} onSubmit={formik.handleSubmit}>
        <div className={styles.createNumberFormGroup}>
          <label htmlFor="hotelId">Отель:</label>
          <select
            id="hotelId"
            name="hotelId"
            className={styles.createNumberInputField}
            value={formik.values.hotelId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите отель</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
          {formik.touched.hotelId && formik.errors.hotelId ? (
            <div className={styles.createNumberError}>
              {formik.errors.hotelId}
            </div>
          ) : null}
        </div>

        <div className={styles.createNumberFormGroup}>
          <label htmlFor="numberTypeId">Тип номера:</label>
          <select
            id="numberTypeId"
            name="numberTypeId"
            className={styles.createNumberInputField}
            value={formik.values.numberTypeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите тип номера</option>
            {numberTypes.map((numberType) => (
              <option key={numberType.id} value={numberType.id}>
                {numberType.name}
              </option>
            ))}
          </select>
          {formik.touched.numberTypeId && formik.errors.numberTypeId ? (
            <div className={styles.createNumberError}>
              {formik.errors.numberTypeId}
            </div>
          ) : null}
        </div>

        <div className={styles.createNumberFormGroup}>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            className={styles.createNumberTextareaField}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className={styles.createNumberError}>
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
      <NavLink to="/home" className={styles.createNumberHomeLink}>
        Домой
      </NavLink>
    </div>
  );
};

export default EditNumber;
