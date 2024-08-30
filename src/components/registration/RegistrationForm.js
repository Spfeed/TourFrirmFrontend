import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/authSlice";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    fatherName: "",
    email: "",
    phoneNumber: "",
    password: "",
    repassword: "",
  });

  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxchange = () => {
    setChecked(!checked);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowRepassword = () => {
    setShowRepassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 150 ||
      !/^[A-Za-zА-Яа-яЁё]+$/.test(formData.name)
    ) {
      newErrors.name =
        "Имя должно быть от 2 до 150 символов и содержать только буквы";
    }

    if (
      !formData.lastName ||
      formData.lastName.length < 1 ||
      formData.lastName.length > 100 ||
      !/^[A-Za-zА-Яа-яЁё]+$/.test(formData.lastName)
    ) {
      newErrors.lastName =
        "Фамилия должна быть от 1 до 100 символов и содержать только буквы";
    }

    if (
      formData.fatherName &&
      (formData.fatherName.length < 1 ||
        formData.fatherName.length > 100 ||
        !/^[A-Za-zА-Яа-яЁё]+$/.test(formData.fatherName))
    ) {
      newErrors.fatherName =
        "Отчество должно быть от 1 до 100 символов и содержать только буквы";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Неверный формат электронной почты";
    }

    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Телефон должен содержать 11 цифр";
    }

    if (
      !formData.password ||
      formData.password.length < 10 ||
      !/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)
    ) {
      newErrors.password =
        "Пароль должен быть минимум 10 символов и содержать буквы двух регистров";
    }

    if (formData.password !== formData.repassword) {
      newErrors.repassword = "Пароли должны совпадать";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/signUp",
          formData
        );

        if (response.status === 201) {
          const userData = response.data;
          dispatch(authActions.signIn(userData));
          history.push("/home");
        } else {
          console.log("Ошибка регистрации");
        }
      } catch (err) {
        console.log("Ошибка: ", err.message);
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber &&
      formData.password &&
      formData.repassword &&
      Object.keys(errors).length === 0 &&
      checked
    );
  };

  return (
    <div className={styles["form-container"]}>
      <h1>Регистрация</h1>
      <form className={styles["form-content"]} onSubmit={handleSubmit}>
        <div className={styles["form-row"]}>
          <div className={styles["form-item"]}>
            <label htmlFor="name">Имя:</label>
            <input
              id="name"
              type="text"
              placeholder="Иван"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className={styles["error-message"]}>{errors.name}</div>
            )}
          </div>
          <div className={styles["form-item"]}>
            <label htmlFor="lastName">Фамилия:</label>
            <input
              id="lastName"
              type="text"
              placeholder="Иванов"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className={styles["error-message"]}>{errors.lastName}</div>
            )}
          </div>
          <div className={styles["form-item"]}>
            <label htmlFor="fatherName">Отчество (необязательно):</label>
            <input
              id="fatherName"
              type="text"
              placeholder="Иванович"
              value={formData.fatherName}
              onChange={handleChange}
            />
            {errors.fatherName && (
              <div className={styles["error-message"]}>{errors.fatherName}</div>
            )}
          </div>
        </div>
        <div className={styles["form-row"]}>
          <div className={styles["form-item"]}>
            <label htmlFor="email">Электронная почта:</label>
            <input
              id="email"
              type="email"
              placeholder="ivanov@mail.ru"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className={styles["error-message"]}>{errors.email}</div>
            )}
          </div>
          <div className={styles["form-item"]}>
            <label htmlFor="phoneNumber">Номер телефона:</label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="88005553535"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className={styles["error-message"]}>
                {errors.phoneNumber}
              </div>
            )}
          </div>
        </div>
        <div className={styles["form-row"]}>
          <div className={styles["form-item"]}>
            <label htmlFor="password">Пароль:</label>
            <div className={styles["password-container"]}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="мин-10 символов: 0-9, A-Z, a-z"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles["toggle-button"]}
                onClick={toggleShowPassword}
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {errors.password && (
              <div className={styles["error-message"]}>{errors.password}</div>
            )}
          </div>
          <div className={styles["form-item"]}>
            <label htmlFor="repassword">Повтор пароля:</label>
            <div className={styles["password-container"]}>
              <input
                id="repassword"
                type={showRepassword ? "text" : "password"}
                placeholder="Пароли должны совпадать"
                value={formData.repassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles["toggle-button"]}
                onClick={toggleShowRepassword}
              >
                {showRepassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            {errors.repassword && (
              <div className={styles["error-message"]}>{errors.repassword}</div>
            )}
          </div>
        </div>
        <div className={styles["checkbox-button"]}>
          <label className={styles["custom-checkbox"]}>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxchange}
            />
            <span className={styles["checkmark"]}></span>
            <span className={styles["label-text"]}>
              Я согласен на обработку персональных данных
            </span>
          </label>
          <button
            id="submit-button-reg"
            type="submit"
            className={styles["submit-button"]}
            disabled={!isFormValid()}
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
