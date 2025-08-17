import "../styles/Contact.module.css";

const Contact = () => {
  return (
    <div className="px-2 max-w-7xl mx-auto w-full md:w-9/12 mt-2 flex-column">
      <h2 className="mx-auto w-[300px]">問い合わせ（作成中）</h2>
      <form method="post" className="flex-column w-full sm:w-95 mx-auto">
        <div className="flex-column">
          <lable for="name" className="block">
            お名前:
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
            メール:
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
            メッセージ:
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
          className="bg-amber-900 text-white px-4 py-1 hover:opacity-80"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default Contact;
