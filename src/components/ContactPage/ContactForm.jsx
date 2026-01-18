import { useState } from "react";

const ContactForm = () => {
  const [data, setData] = useState({
    name: "",
    mail: "",
    text: "",
  });

  const handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="px-2 md:px-[5px] w-[500px] mx-auto mt-2">
      <form method="post" className="flex-column w-full mx-auto">
        <h2 className="w-[300px] text-sm">問い合わせ</h2>
        <span className="text-[0.9rem]">
          ワイルドブロッサムガーデンではお客様により良いサービスを提供するため改善に努めております。
          ワイルドブロッサムガーデン、または当サイトについてご意見やご感想、ご質問ありましたら
          下フォームよりぜひご連絡ください。
        </span>
        <div className="flex-column mt-3">
          <lable for="name" className="block">
            お名前:
          </lable>
          <input
            id="name"
            type="text"
            required="true"
            className="border bg-white px-1"
            style={{ borderRadius: "5px" }}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="flex-column">
          <lable for="email" className="block">
            メール:
          </lable>
          <input
            id="email"
            type="email"
            required="true"
            className="border bg-white px-1"
            style={{ borderRadius: "5px" }}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="flex-column">
          <lable for="message" className="block">
            メッセージ:
          </lable>
          <textarea
            id="message"
            rows="8"
            required="true"
            className="w-full border bg-white px-1"
            style={{ borderRadius: "5px" }}
            onChange={(e) => handleChangeInput(e)}
          ></textarea>
        </div>
        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="bg-amber-950 text-white px-4 py-1 hover:opacity-80"
            style={{ borderRadius: "5px" }}
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
