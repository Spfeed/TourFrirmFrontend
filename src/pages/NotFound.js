import { NavLink } from "react-router-dom/cjs/react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404 Страница не найдена</h1>
      <p>
        Страница по запрошенному адресу отсутствует, проверьте точность адреса.
      </p>
      <NavLink to="/home">На главную</NavLink>
    </div>
  );
};

export default NotFound;
