import { Fragment, useState, useEffect } from "react";
import Footer from "../components/UI/Footer";
import HeaderWithCountryTitle from "../components/country/HeaderWithCountryTitle";
import BigCarousel from "../components/UI/BigCarousel";
import CardWithBgImage from "../components/UI/CardWithBgImage";
import BaseInfo from "../components/country/BaseInfo";
import ToursIntoCountry from "../components/country/ToursIntoCountry";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Country = (props) => {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [citiesCountry, setCitiesCountry] = useState(null);
  const [toursCountry, setToursCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/countries/${countryName}/info`
        );
        setCountryData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryData();
  }, [countryName]);
  useEffect(() => {
    const fetchCitiesCountry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/countries/all-cities/${countryName}`
        );
        setCitiesCountry(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCitiesCountry();
  }, [countryName]);

  useEffect(() => {
    const fetchToursCountry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/countries/${countryName}/tours`
        );
        setToursCountry(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchToursCountry();
  }, [countryName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!countryData || !citiesCountry || !toursCountry) {
    return <p>Loading data...</p>;
  }

  const {
    name,
    description,
    countryPhoto,
    visa,
    language,
    currency,
    localTime,
    religion,
    cityPhotos,
  } = countryData;

  const carouselItemsDynamic = cityPhotos.map((photo, index) => ({
    imgSrc: `http://localhost:8080/${photo}`,
    altText: citiesCountry ? citiesCountry[index] : `City ${index + 1}`,
    captionTitle: citiesCountry ? citiesCountry[index] : `City ${index + 1}`,
  }));

  const firstTour = toursCountry ? toursCountry[0] : null;
  const remainingTours = toursCountry ? toursCountry.slice(1) : [];

  return (
    <Fragment>
      <HeaderWithCountryTitle name={name} />
      <BigCarousel carouselItems={carouselItemsDynamic} />
      <CardWithBgImage
        bgImage={`http://localhost:8080/${countryPhoto}`}
        description={description}
      />
      <BaseInfo
        countryName={name}
        visaInfo={visa}
        langInfo={language}
        currencyInfo={currency}
        timeInfo={localTime}
        religionInfo={religion}
        tourId={firstTour.id}
        tourName={firstTour.name}
        numAdults={firstTour.numAdults}
        numChildren={firstTour.numChildren}
        dateStart={firstTour.dateStart}
        duration={firstTour.duration}
        cost={firstTour.costPack}
        photo={firstTour.cityPhoto}
      />
      <ToursIntoCountry tours={remainingTours} />
      <Footer />
    </Fragment>
  );
};

export default Country;
