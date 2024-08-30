import { useParams } from "react-router-dom/cjs/react-router-dom";
import CreateCountry from "../components/create/CreateCountry";
import { Fragment } from "react";
import CreateCity from "../components/create/CreateCity";
import CreateTransfer from "../components/create/CreateTransfer";
import CreateHotel from "../components/create/CreateHotel";
import CreateNumber from "../components/create/CreateNumber";
import CreateNumberType from "../components/create/CreateNumberType";
import CreateService from "../components/create/CreateService";
import CreateRussianCity from "./CreateRussianCity";
import CreatePackageTour from "../components/create/CreatePackageTour";

const Create = () => {
  const { type } = useParams();

  let Component;
  switch (type) {
    case "countries":
      Component = CreateCountry;
      break;
    case "cities":
      Component = CreateCity;
      break;
    case "transfers":
      Component = CreateTransfer;
      break;
    case "hotels":
      Component = CreateHotel;
      break;
    case "numbers":
      Component = CreateNumber;
      break;
    case "numberTypes":
      Component = CreateNumberType;
      break;
    case "services":
      Component = CreateService;
      break;
    case "russianCities":
      Component = CreateRussianCity;
      break;
    case "packagetours":
      Component = CreatePackageTour;
      break;
  }

  return (
    <Fragment>
      <h1>Создание</h1>
      <Component />
    </Fragment>
  );
};

export default Create;
