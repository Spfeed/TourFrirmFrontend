import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./CreatePackageTour.module.css";
import { NavLink } from "react-router-dom";

const CreatePackageTour = () => {
  const [citiesFrom, setCitiesFrom] = useState([]);
  const [citiesTo, setCitiesTo] = useState([]);
  const [tourOperators, setTourOperators] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesFromResponse = await axios.get(
          "http://localhost:8080/cities/search-form"
        );
        const tourOperatorsResponse = await axios.get(
          "http://localhost:8080/touroperators/pc-crud"
        );
        const transfersResponse = await axios.get(
          "http://localhost:8080/transfers/pc-crud"
        );
        const foodTypesResponse = await axios.get(
          "http://localhost:8080/foodTypes/pc-crud"
        );
        const numbersResponse = await axios.get(
          "http://localhost:8080/numbers/pc-crud"
        );
        const citiesToResponse = await axios.get(
          "http://localhost:8080/cities/pc-crud"
        );

        setCitiesFrom(citiesFromResponse.data);
        setCitiesTo(citiesToResponse.data);
        setTourOperators(tourOperatorsResponse.data);
        setTransfers(transfersResponse.data);
        setFoodTypes(foodTypesResponse.data);
        setNumbers(numbersResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Название тура обязательно"),
    startCityId: Yup.number().required("Выберите город отправления"),
    endCityId: Yup.number().required("Выберите город прибытия"),
    touroperatorId: Yup.number().required("Выберите туроператора"),
    transferId: Yup.number().required("Выберите трансфер"),
    foodTypeId: Yup.number().required("Выберите тип питания"),
    numberId: Yup.number().required("Выберите номер"),
    numAdults: Yup.number()
      .min(1, "Необходимо как минимум 1 взрослый")
      .required("Укажите количество взрослых"),
    numChildren: Yup.number()
      .min(0, "Количество детей не может быть отрицательным")
      .required("Укажите количество детей"),
    duration: Yup.number()
      .min(1, "Продолжительность тура должна быть минимум 1 день")
      .required("Укажите продолжительность тура"),
    dateStart: Yup.date().required("Укажите дату начала тура"),
  });

  const initialValues = {
    name: "",
    startCityId: "",
    endCityId: "",
    touroperatorId: "",
    transferId: "",
    foodTypeId: "",
    numberId: "",
    numAdults: "",
    numChildren: "",
    duration: "",
    dateStart: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post("http://localhost:8080/packagetours/add", values);
        console.log("Package tour added successfully!");
        // Handle success, e.g., redirect or show success message
      } catch (error) {
        console.error("Error adding package tour:", error);
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
    <div className={styles.createPackageTourContainer}>
      <h2>Создание пакетного тура</h2>
      <form
        className={styles.createPackageTourForm}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="name">Название тура:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.createPackageTourInputField}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="startCityId">Город отправления:</label>
          <select
            id="startCityId"
            name="startCityId"
            className={styles.createPackageTourInputField}
            value={formik.values.startCityId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите город</option>
            {citiesFrom.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {formik.touched.startCityId && formik.errors.startCityId ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.startCityId}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="endCityId">Город прибытия:</label>
          <select
            id="endCityId"
            name="endCityId"
            className={styles.createPackageTourInputField}
            value={formik.values.endCityId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите город</option>
            {citiesTo.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {formik.touched.endCityId && formik.errors.endCityId ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.endCityId}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="touroperatorId">Туроператор:</label>
          <select
            id="touroperatorId"
            name="touroperatorId"
            className={styles.createPackageTourInputField}
            value={formik.values.touroperatorId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите туроператора</option>
            {tourOperators.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>
          {formik.touched.touroperatorId && formik.errors.touroperatorId ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.touroperatorId}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="transferId">Трансфер:</label>
          <select
            id="transferId"
            name="transferId"
            className={styles.createPackageTourInputField}
            value={formik.values.transferId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите трансфер</option>
            {transfers.map((transfer) => (
              <option key={transfer.id} value={transfer.id}>
                {transfer.name}
              </option>
            ))}
          </select>
          {formik.touched.transferId && formik.errors.transferId ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.transferId}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="foodTypeId">Тип питания:</label>
          <select
            id="foodTypeId"
            name="foodTypeId"
            className={styles.createPackageTourInputField}
            value={formik.values.foodTypeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите тип питания</option>
            {foodTypes.map((foodType) => (
              <option key={foodType.id} value={foodType.id}>
                {foodType.name}
              </option>
            ))}
          </select>
          {formik.touched.foodTypeId && formik.errors.foodTypeId ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.foodTypeId}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="numberId">Номер:</label>
          <select
            id="numberId"
            name="numberId"
            className={styles.createPackageTourInputField}
            value={formik.values.numberId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Выберите номер</option>
            {numbers.map((number) => (
              <option key={number.id} value={number.id}>
                {number.name}
              </option>
            ))}
          </select>
          {formik.touched.numberId && formik.errors.numberId ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.numberId}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="numAdults">Количество взрослых:</label>
          <input
            type="number"
            id="numAdults"
            name="numAdults"
            className={styles.createPackageTourInputField}
            value={formik.values.numAdults}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.numAdults && formik.errors.numAdults ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.numAdults}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="numChildren">Количество детей:</label>
          <input
            type="number"
            id="numChildren"
            name="numChildren"
            className={styles.createPackageTourInputField}
            value={formik.values.numChildren}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.numChildren && formik.errors.numChildren ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.numChildren}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="duration">Продолжительность (дни):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            className={styles.createPackageTourInputField}
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.duration && formik.errors.duration ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.duration}
            </div>
          ) : null}
        </div>

        <div className={styles.createPackageTourFormGroup}>
          <label htmlFor="dateStart">Дата начала:</label>
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            className={styles.createPackageTourInputField}
            value={formik.values.dateStart}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateStart && formik.errors.dateStart ? (
            <div className={styles.createPackageTourError}>
              {formik.errors.dateStart}
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
      <NavLink to="/home" className={styles.createPackageTourHomeLink}>
        Домой
      </NavLink>
    </div>
  );
};

export default CreatePackageTour;
