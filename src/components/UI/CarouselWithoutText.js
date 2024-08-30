import styles from "./CarouselWithoutText.module.css";
import Carousel from "react-bootstrap/Carousel";

const CarouselWithoutText = (props) => {
  const { images } = props;

  return (
    <div className={styles["custom-carousel-container"]}>
      <Carousel className={styles["custom-carousel"]}>
        {images.map((image, index) => (
          <Carousel.Item key={index} className={styles["custom-carousel-item"]}>
            <img src={`http://localhost:8080/${image}`} alt="hotel photo" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselWithoutText;
