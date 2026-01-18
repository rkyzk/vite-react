import styles from "../../styles/ImagesCol.module.css";

const ImagesColumn = ({ img1, img2, img3 }) => {
  return (
    <div className={`${styles.ColWidth} flex flex-row justify-center`}>
      <div className={`${styles.Images} flex-col mx-auto`}>
        <div className="relative">
          <img
            src={`/src/assets/products/${img1}`}
            className={`${styles.Images} aspect-5/4 object-cover object-center`}
          />
        </div>
        <div className="relative">
          <img
            src={`/src/assets/products/${img2}`}
            className={`${styles.Images} aspect-5/4 object-cover object-center`}
          />
        </div>
        <div className="relative">
          <img
            src={`/src/assets/products/${img3}`}
            className={`${styles.Images} aspect-5/4 object-cover object-center`}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesColumn;
