import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

/**
 * フッター
 */
const FooterComponent = () => {
  return (
    <div className="h-40 w-full pt-10 mt-auto">
      <ul className="ml-[-32px] d-flex justify-center">
        <li>
          <a
            href={"https://www.facebook.com"}
            target="_blank"
            rel="noopener"
            aria-label="Visit our facebook page (opens in a new tab)"
          >
            <FaFacebook className="text-amber-900" />
          </a>
        </li>
        <li>
          <a
            href={"https://www.instagram.com"}
            target="_blank"
            rel="noopener"
            aria-label="Visit our Instagram page (opens in a new tab)"
          >
            <FaInstagram className="ml-2 text-amber-900" />
          </a>
        </li>
      </ul>
      <p className="text-center text-amber-900">ワイルドブロッサムガーデン</p>
      <div className="w-full flex justify-center mt-[-15px]">
        <p className="text-center text-amber-900 w-[220px] text-xs">
          Copyright 2025 @Wild Blossom Garden All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default FooterComponent;
