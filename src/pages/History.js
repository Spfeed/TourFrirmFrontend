import { Fragment } from "react";
import FooterCab from "../components/cabinet/FooterCab";
import HistoryWithToolbar from "../components/historytours/HistoryWithToolbar";
import HeaderCab from "../components/cabinet/HeaderCab";
import { useSelector } from "react-redux";
import BidsWithToolbar from "../components/bids/BidsWithToolbar";

const History = (props) => {
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
      {accessLevel === "USER" ? (
        <HistoryWithToolbar
          userName={userName}
          userId={userId}
          accessLevel={accessLevel}
        />
      ) : (
        <BidsWithToolbar
          userName={userName}
          userId={userId}
          accessLevel={accessLevel}
          history={true}
        />
      )}
      <FooterCab />
    </Fragment>
  );
};

export default History;
