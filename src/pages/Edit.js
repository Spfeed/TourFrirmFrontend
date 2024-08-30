import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Fragment } from "react";
import EditNumber from "../components/edit/EditNumber";
import EditNumberType from "../components/edit/EditNumberType";
import EditService from "../components/edit/EditService";
import EditPackageTour from "../components/edit/EditPackageTour";
import EditTransfer from "../components/edit/EditTransfer";

const Edit = () => {
  const { type } = useParams();

  let Component;
  switch (type) {
    case "numbers":
      Component = EditNumber;
      break;
    case "numberTypes":
      Component = EditNumberType;
      break;
    case "services":
      Component = EditService;
      break;
    case "packagetours":
      Component = EditPackageTour;
      break;
    case "transfers":
      Component = EditTransfer;
      break;
  }

  return (
    <Fragment>
      <h1>Редактирование</h1>
      <Component />
    </Fragment>
  );
};

export default Edit;
