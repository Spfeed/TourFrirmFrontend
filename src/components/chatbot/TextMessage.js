import styles from "./TextMessage.module.css";

const TextMessage = ({ text }) => {
  return <div className={styles["message"]}>{text}</div>;
};

export default TextMessage;
