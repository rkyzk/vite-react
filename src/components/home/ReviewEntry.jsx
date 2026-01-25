import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stars from "../shared/Stars";
import styles from "../../styles/ReviewEntry.module.css";

const ReviewEntry = () => {
  const { reviews } = useSelector((state) => state.reviews);

  return (
    <>
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
          <div>
            <p className="text-right font-bold">{date(entry.createdAt)}</p>
            <p>{entry.user.username}</p>
          </div>
        </Box>
      ))}
    </>
  );
};

export default ReviewEntry;
