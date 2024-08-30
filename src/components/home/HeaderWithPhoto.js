import styles from "./HeaderWithPhoto.module.css";
import Header from "./Header";
import homePageImage from "../../assets/homepageImage.jpg";
import SearchForm from "../UI/SearchForm";
import searchIcon from "../../assets/icons/search.svg";
import ownTourIcon from "../../assets/icons/owntour.svg";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toastActions } from "../../store/toastSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const HeaderWithPhoto = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleCreationTourClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      dispatch(
        toastActions.showToast({
          toastTitle: "Ошибка",
          toastMessage: "Войдите в учетную запись для создания тура",
        })
      );
    }
  };

  return (
    <div className={styles["photo-container"]}>
      <img
        src={homePageImage}
        alt="Background photo"
        className={styles["background-photo"]}
      />
      <div className={styles["header-overlay"]}>
        <Header />
      </div>
      <div className={styles["text-overlay"]}>
        <h1>Определите свой жизненный путь через города и страны</h1>
        <p>
          Исследуйте красоты всего мира, а мы лишь поможем подобрать
          направление!
        </p>
      </div>
      <div className={styles["fake-buttons-overlay"]}>
        <div className={styles["fake-buttons-rectangle"]}>
          <div className={styles["fake-buttons-search-rectangle"]}>
            <div className={styles["fake-buttons-search"]}>
              <img src={searchIcon} alt="Поиск туров" />
              <p>Поиск</p>
            </div>
          </div>
          <div className={styles["fake-buttons-create"]}>
            <img src={ownTourIcon} alt="Создать свой тур" />
            <NavLink
              className={styles["create-text"]}
              onClick={handleCreationTourClick}
              to="/tourcreation"
            >
              Создать
            </NavLink>
          </div>
        </div>
      </div>
      <div className={styles["form-overlay"]}>
        <SearchForm />
      </div>
    </div>
  );
};

export default HeaderWithPhoto;
