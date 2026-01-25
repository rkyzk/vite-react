import { useState } from "react";
import styles from "../../styles/ContactPageContactForm.module.css";

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
    <div className="absolute top-95 mt-5 xxs:px-[10px] w-screen">
      <div
        className={`${styles.Form} bg-slate-600 opacity-80 z-10
          px-1 sm:px-2 max-w-[520px] h-[600px] mx-auto`}
      >
        <form
          method="post"
          className="flex-col flex items-center text-white pt-2"
        >
          <h2 className="text-sm">問い合わせ</h2>
          <span className="text-[0.9rem]">
            ワイルドブロッサムガーデンではお客様により良いサービスを提供するため改善に努めております。
            ワイルドブロッサムガーデン、または当サイトについてご意見やご感想、ご質問がありましたら
            下フォームよりぜひご連絡ください。
          </span>
          <div
            className={`${styles.InputFields} flex flex-col mt-3 items-center`}
          >
            <div className="w-full flex-col">
              <lable for="name" className="block">
                お名前:
              </lable>
              <input
                id="name"
                name="name"
                type="text"
                required="true"
                className="border bg-white px-1 text-neutral-800"
                style={{ borderRadius: "5px" }}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="w-full flex-col">
              <lable for="email" className="block">
                メール:
              </lable>
              <input
                id="email"
                type="email"
                name="mail"
                required="true"
                className="border bg-white px-1 text-neutral-800"
                style={{ borderRadius: "5px" }}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="w-full flex-col">
              <lable for="message" className="block">
                メッセージ:
              </lable>
              <textarea
                id="message"
                rows="8"
                required="true"
                className="w-full border bg-white px-1 text-neutral-800"
                style={{ borderRadius: "5px" }}
                onChange={(e) => handleChangeInput(e)}
              />
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
