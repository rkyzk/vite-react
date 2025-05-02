import bannerList from "../../utils/bannerList";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "../../styles/HeroBanner.module.css";

const HeroBanner = () => {
  return (
    <div>
      <Carousel fade>
        {bannerList.map((item) => (
          <Carousel.Item interval={3000} key={item.id}>
            <div className="max-w-7xl w-9/12 h-90 overflow-hidden m-auto">
              <img src={item.image} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
