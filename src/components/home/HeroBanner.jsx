import bannerList from "../../utils/bannerList";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "../../styles/HeroBanner.module.css";

const HeroBanner = () => {
  return (
    <div>
      <Carousel fade>
        {bannerList.map((item) => (
          <Carousel.Item interval={6000} key={item.id}>
            <div className="px-2 xs:w-auto sm:px-8 max-w-7xl md:h-[350px] lg:w-10/12 overflow-hidden m-auto">
              <img src={item.image} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
