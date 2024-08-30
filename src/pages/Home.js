import { Fragment } from "react";
import HeaderWithPhoto from "../components/home/HeaderWithPhoto";
import UpcomingOffers from "../components/home/UpcomingOffers";
import TourInstruction from "../components/home/TourInstruction";
import Footer from "../components/UI/Footer";
import DropdownNav from "../components/UI/DropdownNav";

const Home = (props) => {
  return (
    <Fragment>
      <HeaderWithPhoto />
      <UpcomingOffers />
      <TourInstruction />
      <Footer />
    </Fragment>
  );
};

export default Home;
