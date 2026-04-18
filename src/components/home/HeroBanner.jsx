import bannerList from "../../utils/bannerList";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "../../styles/HeroBanner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroBanner = () => {
  return (
    <div className="max-w-220 m-auto">
      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect="fade"
        speed={3000}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay
        delay={8000}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {bannerList.map((item, idx) => (
          <SwiperSlide key={idx + 1}>
            <div className="max-w-218 overflow-hidden">
              <img src={item.image} alt="flower fileds" className="max-w-218" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
