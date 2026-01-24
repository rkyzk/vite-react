import ContactForm from "./ContactForm";
import ImagesColumn from "./ImagesColumn";

const ContactPage = () => {
  let imagesLeft = {
    img1: "barrs-purple.jpg",
    img2: "low-grow-ws-mix-aerial.jpg",
    img3: "tulipa-curly-sue.jpg",
  };
  let imagesRight = {
    img1: "partial_shade_wildflower_mix.jpg",
    img2: "crocus-pulchellus.jpg",
    img3: "tulips-pink.jpg",
  };
  return (
    <div className="flex flex-row">
      <ImagesColumn {...imagesLeft} />
      <ContactForm />
      <ImagesColumn {...imagesRight} />
    </div>
  );
};

export default ContactPage;
