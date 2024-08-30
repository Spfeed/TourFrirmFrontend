import { Fragment, useEffect, useState } from "react";
import HeaderWithTourOpsTitle from "../components/touroperators/HeaderWithTourOpsTitle";
import Footer from "../components/UI/Footer";
import TourOpersCards from "../components/touroperators/TourOpersCards";
import axios from "axios";

const Touropers = (props) => {
  const [tourOpersData, setTourOpersData] = useState([]);

  useEffect(() => {
    const fetchTourOperators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/touroperators/withPhotos"
        );
        setTourOpersData(response.data);
      } catch (error) {
        console.error("Error fetching tour operators:", error);
      }
    };

    fetchTourOperators();
  }, []);

  return (
    <Fragment>
      <HeaderWithTourOpsTitle />
      <TourOpersCards tourOpers={tourOpersData} />
      <Footer />
    </Fragment>
  );
};

export default Touropers;
