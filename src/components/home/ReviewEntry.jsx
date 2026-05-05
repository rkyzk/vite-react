import { useSelector } from "react-redux";
import Stars from "../shared/Stars";
import styles from "../../styles/ReviewEntry.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { REVIEW_IMAGE_PATH } from "../../constants/constants";

const ReviewEntry = () => {
  const { entries } = useSelector((state) => state.reviews);
  const date = (data) => data?.substring(0, 10).replaceAll("-", "/");
  return (
    <>
      {entries.content.length > 0 && (
        <>
          <h2
            style={{ fontSize: "1.3rem", fontFamily: "Railway" }}
            className="text-center font-bold mt-3"
          >
            Compliments from our Customers
          </h2>
          <div
            className="flex justify-center w-[97%] sm:w-[95%] max-w-160 mx-auto mt-2"
            // style={{ width: `${width - 10}px` }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              loop={true}
            >
              {entries.content?.map((entry, idx) => (
                <SwiperSlide className={`${styles.Entry} px-2`}>
                  <div key={idx}>
                    <Stars stars={entry.stars} />
                    <div
                      className={`${styles.EntryBox} flex mt-3 justify-center gap-3`}
                    >
                      <div className={`${styles.ReviewEntry}`}>
                        <div className={`${styles.ReviewEntry} absolute`}>
                          <img
                            className={`${styles.Image} relative object-cover overflow-hidden`}
                            src={`${REVIEW_IMAGE_PATH}${entry.imagePath}`}
                            alt="review-image"
                          />
                        </div>
                      </div>
                      <div className={`${styles.ReviewContent} mx-auto`}>
                        <p className="text-justify font-serif font-bold">
                          "{entry.reviewContent}"
                        </p>
                        <div className="-mt-1">
                          <p className="text-right">
                            {date(entry.createdAt)}
                            <br />
                            {entry.displayName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewEntry;
