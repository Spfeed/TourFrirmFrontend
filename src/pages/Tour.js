import { Fragment } from "react";
import Footer from "../components/UI/Footer";
import HeaderWithBackground from "../components/tour/HeaderWithBackground";
import TourDetails from "../components/tour/TourDetails";

const Tour = (props) => {
  return (
    <Fragment>
      <HeaderWithBackground />
      <TourDetails />
      <Footer />
    </Fragment>
  );
};

export default Tour;
