import Slider from "react-slick";
import ReviewEntry from "./ReviewEntry";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../store/actions";

const SimpleSlider = () => {
  const { reviews } = useSelector((state) => state.reviews);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: Math.floor(reviews?.content.length / 3),
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews());
  }, []);
  return (
    <>
      {reviews && (
        <>
          <hr />
          <h2 className="text-center mt-3">お客様の声</h2>
          <Slider {...settings}>
            <div>
              <ReviewEntry
                idx={0}
                num={reviews?.content.length >= 3 ? 3 : reviews?.content.length}
              />
            </div>
            {reviews?.content.length > 3 && (
              <div>
                <ReviewEntry
                  idx={3}
                  num={
                    reviews?.content.length >= 6
                      ? 3
                      : reviews?.content.length - 3
                  }
                />
              </div>
            )}
            {reviews?.content.length > 6 && (
              <div>
                <ReviewEntry
                  idx={6}
                  num={
                    reviews?.content.length >= 9
                      ? 3
                      : reviews?.content.length - 6
                  }
                />
              </div>
            )}
            {reviews?.content.length > 9 && (
              <div>
                <ReviewEntry
                  idx={9}
                  num={
                    reviews?.content.length >= 12
                      ? 3
                      : reviews?.content.length - 9
                  }
                />
              </div>
            )}
          </Slider>
        </>
      )}
    </>
  );
};

export default SimpleSlider;
