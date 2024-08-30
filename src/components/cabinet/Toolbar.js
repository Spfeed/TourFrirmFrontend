import styles from "./Toolbar.module.css";
import homeIcon from "../../assets/icons/house.svg";
import historyIcon from "../../assets/icons/history.svg";
import bidIcon from "../../assets/icons/bid.svg";
import chatIcon from "../../assets/icons/comments.svg";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import editIcon from "../../assets/icons/edit.svg";
import usersIcon from "../../assets/icons/users.svg";

const Toolbar = ({ userId, accessLevel }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["row-home"]}>
          <img src={homeIcon} alt="home" className={styles["home-icon"]} />
          <NavLink to={`/cabinet/main/${userId}`} className={styles["navlink"]}>
            Главная
          </NavLink>
        </div>
        <div className={styles["row-history"]}>
          <img
            src={historyIcon}
            alt="history"
            className={styles["history-icon"]}
          />
          <NavLink
            to={`/cabinet/history/${userId}`}
            className={styles["navlink"]}
          >
            История поездок
          </NavLink>
        </div>
        <div className={styles["row-bid"]}>
          <img src={bidIcon} alt="bid" className={styles["bid-icon"]} />
          <NavLink to={`/cabinet/bids/${userId}`} className={styles["navlink"]}>
            {" "}
            Заявки на туры
          </NavLink>
        </div>
        {accessLevel === "USER" ? (
          <div className={styles["row-chat"]}>
            <img src={chatIcon} alt="chat" className={styles["chat-icon"]} />
            <NavLink to="!#" className={styles["navlink"]}>
              Поддержка
            </NavLink>
          </div>
        ) : (
          <div>
            <div className={styles["row-edit"]}>
              <img src={editIcon} alt="edit" className={styles["edit-icon"]} />
              <NavLink
                to={`/cabinet/crud/${userId}`}
                className={styles["navlink"]}
              >
                Добавить/редактировать
              </NavLink>
            </div>
            <div className={styles["row-users"]}>
              <img
                src={usersIcon}
                alt="users"
                className={styles["users-icon"]}
              />
              <NavLink
                to={`/cabinet/users/${userId}`}
                className={styles["navlink"]}
              >
                Пользователи
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
