import { Fragment } from "react";
import HeaderCab from "../components/cabinet/HeaderCab";
import FooterCab from "../components/cabinet/FooterCab";
import { useSelector } from "react-redux";
import CrudWithToolbar from "../components/crud/CrudWithToolbar";

const Crud = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <p>Загрузка...</p>; // Можно заменить на индикатор загрузки
  }

  const userId = user.id;
  const accessLevel = user.accessLevel;

  return (
    <Fragment>
      <HeaderCab />
      <CrudWithToolbar userId={userId} accessLevel={accessLevel} />
      <FooterCab />
    </Fragment>
  );
};

export default Crud;
