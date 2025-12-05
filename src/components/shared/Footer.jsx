import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

/**
 * フッター
 * リンク
 */
const FooterComponent = () => {
  return (
    <div className="h-40 w-full pt-10">
      <ul className="d-flex justify-content-center">
        <li>
          <a
            href={"https://www.facebook.com"}
            target="_blank"
            rel="noopener"
            aria-label="Visit our facebook page (opens in a new tab)"
          >
            <FaFacebook className="ml-2 text-amber-900" />
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
    </div>
  );
};

export default FooterComponent;
