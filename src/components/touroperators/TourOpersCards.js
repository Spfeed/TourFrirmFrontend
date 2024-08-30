import { Fragment } from "react";
import TourOpeatorCard from "./TourOpeatorCard";

const TourOpersCards = (props) => {
  const { tourOpers } = props;
  return (
    <Fragment>
      {tourOpers.map((tourOper, index) => (
        <TourOpeatorCard
          key={index}
          tourOperTitle={tourOper.name}
          imgRef={`http://localhost:8080/${tourOper.photoUrls[0]}`}
          tourOperRating={tourOper.rating}
          tourOperLink={tourOper.site}
          tourOperDescription={tourOper.description}
        />
      ))}
    </Fragment>
  );
};

export default TourOpersCards;
