import { Fragment } from "react";
import HeaderWithBackground from "../components/tour/HeaderWithBackground";
import Footer from "../components/UI/Footer";
import CreateGuide from "../components/tourcreation/CreateGuide";
import CreationForm from "../components/tourcreation/CreationForm";
import { useSelector } from "react-redux";

const TourCreation = (props) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <p>Загрузка...</p>; // Можно заменить на индикатор загрузки
  }

  const userName = user.name;
  const userId = user.id;
  return (
    <Fragment>
      <HeaderWithBackground />
      <CreateGuide />
      <CreationForm userId={userId} />
      <Footer />
    </Fragment>
  );
};

export default TourCreation;
