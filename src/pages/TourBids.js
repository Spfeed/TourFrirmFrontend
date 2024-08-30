import { Fragment } from "react";
import HeaderCab from "../components/cabinet/HeaderCab";
import FooterCab from "../components/cabinet/FooterCab";
import BidsWithToolbar from "../components/bids/BidsWithToolbar";
import { useSelector } from "react-redux";

const TourBids = (props) => {
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
      <BidsWithToolbar
        userName={userName}
        userId={userId}
        accessLevel={accessLevel}
        history={false}
      />
      <FooterCab />
    </Fragment>
  );
};

export default TourBids;
