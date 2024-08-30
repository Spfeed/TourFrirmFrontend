import styles from "./ChatBotWindow.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TourOperatorMessage from "./TourOperatorMessage";
import CountryMessage from "./CountryMessage";
import CityMessage from "./CityMessage";
import TourMessage from "./TourMessage";
import HotelMessage from "./HotelMessage";
import TextMessage from "./TextMessage";
import { useSelector, useDispatch } from "react-redux";
import { chatBotActions } from "../../store/chatBotSlice";

const ChatBotWindow = ({ onClosed, isOpen }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatbot.messages);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchGreetings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        const data = response.data;
        const botMessage = { ...data, sender: "bot" };
        dispatch(chatBotActions.addMessage(botMessage));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchGreetings();
  }, []);

  const handleSendMessage = async (message) => {
    const userMessage = { sender: "user", text: message };
    dispatch(chatBotActions.addMessage(userMessage));

    try {
      const response = await axios.post("http://localhost:8000/query/", {
        text: message,
      });
      const data = response.data;

      const botMessage = { ...data, sender: "bot" };
      dispatch(chatBotActions.addMessage(botMessage));
    } catch (err) {
      console.error(err.message);
    }
  };

  const renderMessage = (message, index) => {
    if (message.sender === "user") {
      return (
        <div
          key={index}
          className={`${styles["message"]} ${styles["user-message"]}`}
        >
          {message.text}
        </div>
      );
    }

    if (message.sender === "bot") {
      if (message.rating) {
        return <TourOperatorMessage key={index} data={message} />;
      } else if (message.visa_info) {
        return <CountryMessage key={index} data={message} />;
      } else if (message.city_url) {
        return <CityMessage key={index} data={message} />;
      } else if (message.tour_url) {
        return <TourMessage key={index} data={message} />;
      } else if (message.hotel_url) {
        return <HotelMessage key={index} data={message} />;
      } else {
        if (message.answer) {
          return <TextMessage key={index} text={message.answer} />;
        } else {
          return <TextMessage key={index} text={message.message} />;
        }
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      handleSendMessage(input);
      setInput("");
    }
  };

  return (
    <div
      className={`${styles["chat-window"]} ${
        isOpen ? styles.open : styles.close
      }`}
    >
      <div className={styles["chat-header"]}>
        <h2>Чат</h2>
        <button className={styles["close-button"]} onClick={onClosed}>
          ×
        </button>
      </div>
      <div className={styles["chat-body"]}>
        {messages.map((msg, index) => renderMessage(msg, index))}
      </div>
      <div className={styles["chat-footer"]}>
        <input
          id="input-chatbot"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Введите сообщение..."
        />
      </div>
    </div>
  );
};

export default ChatBotWindow;
