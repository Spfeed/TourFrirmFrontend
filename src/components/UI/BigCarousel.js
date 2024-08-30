import styles from "./BigCarousel.module.css";
import Carousel from "react-bootstrap/Carousel";

const BigCarousel = (props) => {
  const { carouselItems } = props;

  return (
    <div className={styles["custom-carousel-rect"]}>
      <Carousel className={styles["custom-carousel"]}>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img src={item.imgSrc} alt={item.altText} />
            <Carousel.Caption>
              <h3>{item.captionTitle}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BigCarousel;
