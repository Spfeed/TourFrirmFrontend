import { Fragment } from "react";
import { useSelector } from "react-redux";
import HeaderCab from "../components/cabinet/HeaderCab";
import FooterCab from "../components/cabinet/FooterCab";
import TableWithToolbar from "../components/users/TableWithToolbar";

const Users = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <p>Загрузка...</p>; // Можно заменить на индикатор загрузки
  }

  const userId = user.id;
  const accessLevel = user.accessLevel;

  return (
    <Fragment>
      <HeaderCab />
      <TableWithToolbar userId={userId} accessLevel={accessLevel} />
      <FooterCab />
    </Fragment>
  );
};

export default Users;
