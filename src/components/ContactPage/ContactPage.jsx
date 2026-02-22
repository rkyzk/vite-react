import ContactForm from "./ContactForm";
import Footer from "../shared/Footer";
// import ImagesColumn from "./ImagesColumn";
import styles from "../../styles/ContactPageContactForm.module.css";

const ContactPage = () => {
  const bgImage = "/images/products/3/barrs-purple.jpg";
  return (
    <div className={`${styles.bg} flex justify-center`}>
      <img src={bgImage} alt={bgImage} className="z-auto" />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactPage;
