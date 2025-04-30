import bannerList from "../../utils/bannerList";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";

const HeroBanner = () => {
  return (
    <Carousel fade>
      {bannerList.map((item) => (
        <Carousel.Item interval={2000} key={item.id}>
          <img src={item.image} className="w-9/12 h-50" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroBanner;
