import styles from "./CityCarousel.module.css";
import Carousel from "react-bootstrap/Carousel";

const CityCarousel = (props) => {
  const { carouselItems } = props;

  return (
    <div className={styles["custom-carousel-rect"]}>
      <Carousel className={styles["custom-carousel"]}>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img src={item.imgSrc} alt={item.altText} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CityCarousel;
