import { Fragment } from "react";
import HeaderCab from "../components/cabinet/HeaderCab";
import FooterCab from "../components/cabinet/FooterCab";
import ContentWithToolbar from "../components/cabinet/ContentWithToolbar";
import { useSelector } from "react-redux";

const Cabinet = (props) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <p>Загрузка...</p>; // Можно заменить на индикатор загрузки
  }

  const userName = user.name;
  const userId = user.id;
  const accessLevel = user.accessLevel;
  return (
    <Fragment>
      <HeaderCab />
      <ContentWithToolbar
        userName={userName}
        userId={userId}
        accessLevel={accessLevel}
      />
      <FooterCab />
    </Fragment>
  );
};

export default Cabinet;
