import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Forbidden = () => {
  return (
    <div>
      <h1>403 Forbidden</h1>
      <p>Доступ запрещен. Вы пытаетесь перейти на страницу с чужими данными</p>
      <NavLink to="/home">На главную</NavLink>
    </div>
  );
};

export default Forbidden;
