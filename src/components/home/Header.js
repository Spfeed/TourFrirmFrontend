import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import DropdownNav from "../UI/DropdownNav";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import LogInForm from "../UI/LogInForm";
import axios from "axios";
import { useSelector } from "react-redux";
import cabinetIcon from "../../assets/icons/account.svg";

const Header = () => {
  const [showLogInModal, setShowLogInModal] = useState(false);

  const handleShowLogInModal = () => setShowLogInModal(true);
  const handleCloseLogInModal = () => setShowLogInModal(false);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/countries/names"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке стран", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/countries/all-cities/Россия"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке городов России", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles["header__row"]}>
          <NavLink to="/home">
            <h1>AATours</h1>
          </NavLink>
          <nav className={styles["header__nav"]}>
            <ul>
              <li>
                <DropdownNav
                  listTitle="Страны"
                  items={countries}
                  country={true}
                />
              </li>
              <li>
                <DropdownNav
                  listTitle="Города"
                  items={cities}
                  country={false}
                />
              </li>
              <li>
                <NavLink to="/touroperators" className={styles["nav-link"]}>
                  Туроператоры
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={styles["nav-link"]}>
                  О нас
                </NavLink>
              </li>
              <li>
                {isAuth ? (
                  <NavLink
                    to={`/cabinet/main/${userId}`}
                    className={styles["nav-link"]}
                  >
                    <div className={styles["cabinet-container"]}>
                      <img
                        src={cabinetIcon}
                        alt="Личный кабинет"
                        className={styles["cabinet-icon"]}
                      />
                      <p className={styles["cabinet-text"]}>В кабинет</p>
                    </div>
                  </NavLink>
                ) : (
                  <button
                    id="log-in-button"
                    className={styles["header__nav-btn"]}
                    onClick={handleShowLogInModal}
                  >
                    Войти
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <LogInForm
        showModal={showLogInModal}
        handlecloseModal={handleCloseLogInModal}
      />
    </header>
  );
};

export default Header;
