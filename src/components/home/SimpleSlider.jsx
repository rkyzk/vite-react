import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../store/actions";
import styles from "../../styles/ReviewEntry.module.css";
import ReviewEntry from "./ReviewEntry";
import useWindowWidth from "../../hooks/useWindowWidth";
import Slider from "react-slick";

const SimpleSlider = () => {
  const width = useWindowWidth();
  const { reviews } = useSelector((state) => state.reviews);
  console.log(width);
  const [elems, setElems] = useState([]);
  const getElemsPerSlide = () => {
    if (width < 610) {
      return 1;
    } else if (width < 900) {
      return 2;
    } else if (width < 1200) {
      return 3;
    } else {
      return 4;
    }
  };
  const getTotalSlides = () => {
    if (width < 610) {
      return reviews ? reviews.totalElements / 1 : 0;
    } else if (width < 900) {
      return reviews ? Math.ceil(reviews.totalElements / 2) : 0;
    } else if (width < 1200) {
      return reviews ? Math.ceil(reviews.totalElements / 3) : 0;
    } else {
      return reviews ? Math.ceil(reviews.totalElements / 4) : 0;
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews());
  }, []);
  useEffect(() => {
    if (reviews) {
      let elemsPerSlide = getElemsPerSlide();
      let numSlides = getTotalSlides();
      let idx = 0;
      let newElems = [];
      console.log(reviews.totalElements);
      console.log(elemsPerSlide);
      for (let i = 0; i < numSlides; i++) {
        newElems.push(<ReviewEntry key={i} num={elemsPerSlide} idx={idx} />);
        idx += elemsPerSlide;
      }
      setElems(newElems);
      console.log(elems);
    }
  }, [reviews, width]);

  return (
    <>
      {elems.length > 0 && (
        <>
          <hr />
          <h2 className={`${styles.Text} text-center mt-3`}>お客様の声</h2>
          <Slider {...settings}>{elems.map((entry) => entry)}</Slider>
        </>
      )}
    </>
  );
};

export default SimpleSlider;
