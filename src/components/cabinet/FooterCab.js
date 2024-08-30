import styles from "./FooterCab.module.css";

const FooterCab = (props) => {
  return (
    <div className={styles["container"]}>
      <p className={styles["rights"]}>© 2024 AATours. All rights reserved.</p>
    </div>
  );
};

export default FooterCab;
