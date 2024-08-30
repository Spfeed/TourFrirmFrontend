import Header from "../home/Header";
import styles from "./HeaderWithBackground.module.css";

const HeaderWithBackground = (props) => {
  return (
    <div className={styles["container"]}>
      <Header />
    </div>
  );
};

export default HeaderWithBackground;
