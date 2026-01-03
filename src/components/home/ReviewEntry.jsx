import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stars from "../shared/Stars";
import styles from "../../styles/ReviewEntry.module.css";

const ReviewEntry = ({ idx, num }) => {
  const { reviews } = useSelector((state) => state.reviews);
  const date = (data) => data?.substring(0, 10).replaceAll("-", "/");
  return (
    <div className="grid xs:w-[310px] xs:grid-col-1 sm:w-[615px] sm:gap-2 sm:grid-cols-2 lg:w-[920px] lg:grid-cols-3">
      {reviews.content.slice(idx, idx + num).map((entry) => (
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
          <Stars stars={entry.stars} />
          <p className="text-left mt-2">{entry.reviewContent}</p>
          <p className="text-right font-bold">
            {date(entry.createdAt)}
            <br />
            {entry.user.username}
          </p>
        </Box>
      ))}
    </div>
  );
};

export default ReviewEntry;
