import ContactForm from "./ContactForm";
import Footer from "../shared/Footer";
import styles from "../../styles/ContactPageContactForm.module.css";

const ContactPage = () => {
  const bgImage =
    "https://res.cloudinary.com/ds66fig3o/image/upload/v1774786233/ecommerce/images/products/3/barrs-purple_lguk44.jpg";
  return (
    <div className={`${styles.bg} flex justify-center`}>
      <img src={bgImage} alt={bgImage} className="z-auto" />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactPage;
