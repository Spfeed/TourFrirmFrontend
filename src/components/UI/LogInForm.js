import { Fragment, useState, useEffect } from "react";
import styles from "./LogInForm.module.css";
import Modal from "react-bootstrap/Modal";
import showIcon from "../../assets/icons/show.svg";
import hideIcon from "../../assets/icons/hide.svg";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { authActions } from "../../store/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const LogInForm = (props) => {
  const { showModal, handlecloseModal } = props;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errRequest, setErrRequest] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Current auth state:", authState);
  }, [authState]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? "Введите ваш email" : "",
        password: !formData.password ? "Введите пароль" : "",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors({
        ...errors,
        email: "Пожалуйста, введите корректный email",
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrors({
        ...errors,
        password:
          "Длина пароля не может быть менее 10 символов, он должен содержать цифры и буквы обоих регистров",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/signIn", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const userData = response.data;
        dispatch(authActions.signIn(userData));
        handlecloseModal();
      } else {
        console.log("Неверные учетные данные");
      }
    } catch (err) {
      setErrRequest("Неверный email или пароль");
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/.test(password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={handlecloseModal}
        centered
        className={styles["custom-modal"]}
      >
        <Modal.Body className={styles["custom-modal-body"]}>
          <h1>Вход в аккаунт</h1>
          <div className={styles["modal-content"]}>
            <form onSubmit={handleSubmit}>
              <input
                className={styles["input-field"]}
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={styles["error-message"]}>{errors.email}</span>
              )}
              <div className={styles["password-wrapper"]}>
                <input
                  className={styles["input-field"]}
                  placeholder="Пароль"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={styles["toggle-password"]}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <img src={hideIcon} alt="Скрыть" />
                  ) : (
                    <img src={showIcon} alt="Показать" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className={styles["error-message"]}>
                  {errors.password}
                </span>
              )}
              {errRequest && (
                <span className={styles["error-message"]}>{errRequest}</span>
              )}
              <button
                id="login-submit-button"
                className={styles["login-button"]}
                type="submit"
                disabled={!formData.email || !formData.password}
              >
                Войти
              </button>
            </form>

            <NavLink to="/registration" className={styles["register-button"]}>
              Зарегистрироваться
            </NavLink>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default LogInForm;
