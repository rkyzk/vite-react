import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stars from "../shared/Stars";
import { useEffect } from "react";
import { fetchReviews } from "../../store/actions";
import styles from "../../styles/ReviewEntry.module.css";

const SimpleSlider = () => {
  const { reviews } = useSelector((state) => state.reviews);
  const date = (data) => data?.substring(0, 10).replaceAll("-", "/");
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews());
  }, []);
  console.log(Math.ceil(reviews?.content?.length / 3));
  return (
    <>
      {reviews && (
        <>
          <hr />
          <h2 className={`${styles.Text} text-center mt-3`}>お客様の声</h2>
          <div className="slider-container">
            <Slider {...settings}>
              {reviews?.content?.map((entry) => (
                <div key={entry.id} className={`${styles.EntryBox}`}>
                  <Stars stars={entry.stars} />
                  <p className="text-left mt-2">{entry.reviewContent}</p>
                  <div className="flex justify-end">
                    <p className="w-[130px] text-sm/5 font-bold">
                      {date(entry.createdAt)}
                      <br />
                      {entry.user.username}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </>
  );
};

export default SimpleSlider;
