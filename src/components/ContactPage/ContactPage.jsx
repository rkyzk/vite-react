import ContactForm from "./ContactForm";
// import ImagesColumn from "./ImagesColumn";
import styles from "../../styles/ContactPageContactForm.module.css";

const ContactPage = () => {
  const bgImage = "/src/assets/products/barrs-purple.jpg";
  return (
    <div className={`${styles.bg} flex justify-center`}>
      <img src={bgImage} alt={bgImage} />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
