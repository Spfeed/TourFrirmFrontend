import styles from "./ChatWithSupport.module.css";

const ChatWithSupport = (props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <div className={styles["chat-bg"]}></div>
        <form className={styles["form"]}>
          <input
            type="text"
            placeholder="Введите ваше сообщение"
            className={styles["input"]}
          ></input>
          <button type="submit" className={styles["button"]}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWithSupport;
