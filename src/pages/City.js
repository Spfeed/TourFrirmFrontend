import { Fragment, useState, useEffect } from "react";
import HeaderWithCityTitle from "../components/city/HeaderWithCityTitle";
import CardWithBgImage from "../components/UI/CardWithBgImage";
import Footer from "../components/UI/Footer";
import ToursFromCity from "../components/city/ToursFromCity";
import CityCarousel from "../components/UI/CityCarousel";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const City = (props) => {
  const { cityName } = useParams();

  const [cityData, setCityData] = useState(null);
  const [toursData, setToursData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cities/${cityName}/info`
        );
        setCityData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCityData();
  }, [cityName]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cities/${cityName}/toursOnPage`
        );
        setToursData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourData();
  }, [cityName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cityData || !toursData) {
    return <p>Loading data...</p>;
  }

  const carouselItemsDynamic = cityData.cityPhotos.map((photo, index) => ({
    imgSrc: `http://localhost:8080/${photo}`,
  }));

  return (
    <Fragment>
      <HeaderWithCityTitle title={cityName} />
      <CityCarousel carouselItems={carouselItemsDynamic} />
      <CardWithBgImage
        bgImage={`http://localhost:8080/${cityData.photoBg}`}
        description={cityData.description}
      />
      <ToursFromCity tours={toursData} />
      <Footer />
    </Fragment>
  );
};

export default City;
