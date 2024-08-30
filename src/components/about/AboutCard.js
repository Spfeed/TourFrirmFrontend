import styles from "./AboutCard.module.css";

const AboutCard = (props) => {
  const { title, firstRow, secondRow } = props;

  return (
    <div className={styles["container"]}>
      <h1>{title}</h1>
      <div className={styles["content"]}>
        <p>{firstRow}</p>
        <p>{secondRow}</p>
      </div>
    </div>
  );
};

export default AboutCard;
