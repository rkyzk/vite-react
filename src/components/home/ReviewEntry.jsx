import { useSelector } from "react-redux";
import Stars from "../shared/Stars";
import styles from "../../styles/ReviewEntry.module.css";
import useWindowWidth from "../../hooks/useWindowWidth";

const ReviewEntry = ({ key, num, idx }) => {
  const { reviews } = useSelector((state) => state.reviews);
  const width = useWindowWidth();
  const date = (data) => data?.substring(0, 10).replaceAll("-", "/");
  console.log("review entry: " + key + ", " + num + ", " + idx);
  // className={`flex ${num < 3 ? "justify-start" : "justify-center"} gap-x-3 ml-[-10px]`}
  return (
    <div
      className="flex justify-center gap-x-3 ml-[-10px]"
      style={{ width: `${width - 10}px` }}
    >
      {reviews.content.slice(idx, idx + num).map((entry) => (
        <div key={key} className={`${styles.Entry} w-[280px]`}>
          <Stars stars={entry.stars} />
          <p className="text-left mt-2">{entry.reviewContent}</p>
          <div>
            <p className="text-right font-bold">
              {date(entry.createdAt)}
              <br />
              {entry.user.username}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewEntry;
