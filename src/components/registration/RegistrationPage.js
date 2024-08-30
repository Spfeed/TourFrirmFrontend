import styles from "./RegistrationPage.module.css";
import bgImage from "../../assets/regbackground.jpeg";
import Header from "../home/Header";
import Footer from "../UI/Footer";
import RegistrationForm from "./RegistrationForm";

const RegistrationPage = (props) => {
  return (
    <div>
      <div className={styles["content-wrapper"]}>
        <div className={styles["header-with-background"]}>
          <Header />
        </div>
        <div className={styles["form-wrap"]}>
          <RegistrationForm />
        </div>
      </div>
      <img src={bgImage} className={styles["bg-image"]} />
      <Footer />
    </div>
  );
};

export default RegistrationPage;
