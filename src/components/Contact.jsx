import "../styles/Contact.module.css";

const Contact = () => {
  return (
    <div className="px-2 max-w-7xl mx-auto w-full md:w-9/12 mt-2 flex-column">
      <h2 className="w-16 mx-auto">Contact</h2>
      <form method="post" className="flex-column w-full sm:w-95 mx-auto">
        <p className="text-justify">
          If you have any inquiries, suggestions or concerns, feel free to write
          to us! We'll get back to you as soon as possible.
        </p>
        <div className="flex-column">
          <lable for="name" className="block">
            Your full name:
          </lable>
          <input
            id="name"
            type="text"
            required="true"
            className="border bg-white rounded-lg"
          ></input>
        </div>
        <div className="flex-column">
          <lable for="email" className="block">
            Your email:
          </lable>
          <input
            id="email"
            type="email"
            required="true"
            className="border bg-white rounded-lg"
          ></input>
        </div>
        <div className="flex-column">
          <lable for="message" className="block">
            message:
          </lable>
          <textarea
            id="message"
            rows="4"
            required="true"
            className="w-full border bg-white rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="rounded-4xl bg-amber-900 text-white px-4 py-1 hover:opacity-80"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
