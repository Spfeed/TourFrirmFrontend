import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import styles from "./HeaderCab.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const HeaderCab = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(authActions.signOut());
    history.push("/home");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <h1 className={styles["header-title"]}>Личный кабинет</h1>
        <div className={styles["right-side"]}>
          <NavLink to="/home" className={styles["right-text"]}>
            Домой
          </NavLink>
          <div className={styles["divide"]}></div>
          <button className={styles["right-button"]} onClick={handleLogOut}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCab;
