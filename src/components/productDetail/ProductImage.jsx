import { Navigation, Pagination, A11y } from "swiper/modules";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import styles from "../../styles/Product.module.css";

const ProductImage = ({ imagePath, productName, productDetail }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const urlStart = "https://res.cloudinary.com/ds66fig3o/image/upload";
  const thumbPathAddition = "/c_thumb,w_200,g_face";

  return (
    <div className={`${styles.Swiper} mx-auto`}>
      <Swiper
        modules={[Navigation, Pagination, A11y, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide key={0}>
          <img
            src={`${urlStart}${imagePath}`}
            alt={productName}
            className={`${styles.ImgSize} object-cover object-center`}
          />
        </SwiperSlide>
        {productDetail
          .filter((entry) => entry.key === "imagePath")
          .map((entry, idx) => (
            <SwiperSlide key={idx + 1}>
              <img
                src={`${urlStart}${entry.value}`}
                alt={productName}
                className={`${styles.ImgSize} object-cover object-center`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {productDetail.filter((elem) => elem.key == "imagePath").length > 0 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          spaceBetween={2}
          slidesPerView={5}
          watchSlidesVisibility
          watchSlidesProgress
          className="mt-1"
        >
          <SwiperSlide key={0}>
            <img
              src={`${urlStart}${thumbPathAddition}${imagePath}`}
              alt={`thumb-${productName}`}
              className="hidden md:block w-21.25 h-17 object-cover object-center"
            />
          </SwiperSlide>
          {productDetail
            .filter((entry) => entry?.key === "imagePath")
            .map((entry, idx) => (
              <SwiperSlide key={idx + 1}>
                <img
                  src={`${urlStart}${thumbPathAddition}${entry.value}`}
                  alt={`thumb-${productName}`}
                  className="hidden md:block w-21.25 h-17 object-cover object-center"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImage;
