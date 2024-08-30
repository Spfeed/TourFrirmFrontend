import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import TouristNoticeModal from "../touristnotice/TouristNoticeModal";
import { useState } from "react";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>&copy; 2024 AATours. All rights reserved.</p>
        <ul className={styles.footerNav}>
          <li>
            <NavLink to="/home" className={styles.link}>
              Главная
            </NavLink>
          </li>
          <li>
            <button className={styles.link} onClick={handleShowModal}>
              Памятка туриста
            </button>
          </li>
          <li>
            <NavLink to="/about" className={styles.link}>
              О нас
            </NavLink>
          </li>
          <li>
            <a href="#" className={styles.link}>
              Связаться с нами
            </a>
          </li>
        </ul>
      </div>
      <TouristNoticeModal show={showModal} handleClose={handleCloseModal} />
    </footer>
  );
};

export default Footer;
