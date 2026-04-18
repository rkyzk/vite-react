import { useSelector } from "react-redux";
import Stars from "../shared/Stars";
import styles from "../../styles/ReviewEntry.module.css";
import useWindowWidth from "../../hooks/useWindowWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

const ReviewEntry = ({ key, num, idx }) => {
  const { reviews } = useSelector((state) => state.reviews);
  const width = useWindowWidth();
  const date = (data) => data?.substring(0, 10).replaceAll("-", "/");
  return (
    <div
      className="flex justify-center gap-x-3 -ml-2.5"
      style={{ width: `${width - 10}px` }}
    >
      <Swiper
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
        }}
        modules={[Navigation]}
        spaceBetween={0}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          {reviews.content.slice(idx, idx + num).map((entry) => (
            <div key={key} className={`${styles.Entry} w-[285px]`}>
              <Stars stars={entry.stars} />
              <p className="text-justify mt-2">{entry.reviewContent}</p>
              <div>
                <p className="text-right font-bold">
                  {date(entry.createdAt)}
                  <br />
                  {entry.user.username}
                </p>
              </div>
            </div>
          ))}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReviewEntry;
