import styles from "./ChatButton.module.css";
import chatIcon from "../../assets/icons/sms.svg";
import { useState } from "react";
import ChatBotWindow from "./ChatBotWindow";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {!isOpen && (
        <div id="chat-button" className={styles["container"]}>
          <button className={styles["button"]} onClick={handleToggleChat}>
            <img
              src={chatIcon}
              alt="Открыть чат"
              className={styles["chat-icon"]}
            />
          </button>
        </div>
      )}
      {isOpen && <ChatBotWindow isOpen={isOpen} onClosed={handleToggleChat} />}
    </div>
  );
};

export default ChatButton;
