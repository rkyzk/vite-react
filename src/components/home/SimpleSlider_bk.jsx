import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchReviews } from "../../store/actions";
import Box from "@mui/material/Box";
import Stars from "../shared/Stars";
import styles from "../../styles/ReviewEntry.module.css";

const SimpleSlider = () => {
  const { reviews } = useSelector((state) => state.reviews);
  const date = (data) => data?.substring(0, 10).replaceAll("-", "/");
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: Math.ceil(reviews?.content?.length / 3),
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
            {reviews?.content?.map((entry) => (
              <Box
                key={entry.id}
                className={`${styles.Entry}`}
                sx={(theme) => ({
                  boxShadow: 1,
                  width: "300px",
                  height: "200px",
                  bgcolor: "#fff",
                  color: "grey.800",
                  p: 1,
                  m: 1,
                  marginBottom: "4px",
                  borderRadius: 2,
                  textAlign: "center",
                  fontSize: "0.875rem",
                  fontWeight: "700",
                  ...theme.applyStyles("dark", {
                    bgcolor: "#101010",
                    color: "grey.300",
                  }),
                })}
              >
                <p className="text-left mt-2">{entry.reviewContent}</p>
                <Stars stars={entry.stars} />
                <p className="text-right font-bold">
                  {date(entry.createdAt)}
                  <br />
                  {entry.user.username}
                </p>
              </Box>
            ))}
            {/* {reviews?.content?.length > 3 && (
              <div>
                <ReviewEntry
                  idx={3}
                  num={
                    reviews?.content?.length >= 6
                      ? 3
                      : reviews?.content?.length - 3
                  }
                />
              </div>
            )}
            {reviews?.content?.length > 6 && (
              <div>
                <ReviewEntry
                  idx={6}
                  num={
                    reviews?.content?.length >= 9
                      ? 3
                      : reviews?.content?.length - 6
                  }
                />
              </div>
            )}
            {reviews?.content?.length > 9 && (
              <div>
                <ReviewEntry
                  idx={9}
                  num={
                    reviews?.content?.length >= 12
                      ? 3
                      : reviews?.content?.length - 9
                  }
                />
              </div>
            )} */}
          </Slider>
        </>
      )}
    </>
  );
};

export default SimpleSlider;
