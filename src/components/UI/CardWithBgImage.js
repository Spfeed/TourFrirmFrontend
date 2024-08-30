import styles from "./CardWithBgImage.module.css";

const CardWithBgImage = (props) => {
  const { bgImage, description } = props;

  return (
    <div className={styles["container"]}>
      <img
        src={bgImage}
        alt="some image"
        className={styles["container-image"]}
      />
      <div className={styles["container-shadow"]}></div>
      <div className={styles["content"]}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CardWithBgImage;
