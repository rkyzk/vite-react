import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../styles/Filter.module.css";
import { fetchCategories, clearErrorMessage } from "../store/actions";
import CheckboxesGroup from "./shared/CheckboxesGroup";

const Filter = ({ categoryId }) => {
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState(categoryId);
  const [colors, setColors] = useState("");
  const [colorLabel, setColorLabel] = useState("");
  const [sort, setSort] = useState("label");
  const initialColorState = {
    red: false,
    orange: false,
    yellow: false,
    blue: false,
    pink: false,
    purple: false,
    white: false,
    multi: false,
  };
  const [colorState, setColorState] = useState(initialColorState);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.categories);
  const { errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      errorMessage && dispatch(clearErrorMessage());
      searchParams.delete("page");
      if (
        category === null ||
        category === "" ||
        category === "null" ||
        category === 0
      ) {
        searchParams.delete("category");
      } else {
        searchParams.set("category", category);
      }
      // Trim spaces of keywords. Replace spaces in the middle with '_'
      let trimmedKeywords = keywords.trim();
      let searchTerms = trimmedKeywords.replace(/\s+/g, "_");
      searchTerms === ""
        ? searchParams.delete("keywords")
        : searchParams.set("keywords", searchTerms);
      colors === ""
        ? searchParams.delete("colors")
        : searchParams.set("colors", colors);
      sort === "label" || sort === "random"
        ? searchParams.delete("sortBy")
        : searchParams.set("sortBy", sort);
      navigate(`?${searchParams.toString()}`);
    }, 700);
    return () => clearTimeout(handler);
  }, [category, keywords, colors, sort]);

  useEffect(() => {
    Object.keys(categories).length === 0 && dispatch(fetchCategories());
  }, []);

  const handleClearFilter = () => {
    setCategory("");
    setKeywords("");
    setColors("");
    setColorState(initialColorState);
    setColorLabel("");
    setSort("label");
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center sm:mt-4">
      <div className={`w-[550px] ${styles.FilterInput} flex-col items-center`}>
        <div className="flex flex-col mx-auto gap-1 sm:gap-2 sm:flex-row">
          {/* Search box */}
          <input
            type="text"
            placeholder="キーワードを入力"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className={`${styles.SerachInput} text-slate-700 border border-gray-900 rounded-md bg-stone-100
                   px-1 py-2`}
          />
          {/* Category drowdown */}
          <select
            labelId="category-select-label"
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            name="category"
            className="py-1 w-64 bg-white border border-slate-800 rounded-md
                h-[40px] outline-none focus:outline-none"
            style={{ width: "200px" }}
          >
            {category === "null" && (
              <option defaultChecked>花種でフィルター</option>
            )}
            {categories.map((item) => (
              <option
                key={item.categoryId}
                value={item.categoryId}
                className="font-sans text-slate-700"
              >
                {item.categoryName}
              </option>
            ))}
            {category >= 0 && (
              <option value={0} className="font-sans text-slate-700">
                すべての花種
              </option>
            )}
          </select>
        </div>
        <div className="mt-1 flex flex-col gap-y-1 sm:flex-row sm:gap-x-1">
          <CheckboxesGroup
            colorState={colorState}
            setColorState={setColorState}
            setColors={setColors}
            colorLabel={colorLabel}
            setColorLabel={setColorLabel}
          />
          <select
            id="order-by"
            name="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`${styles.OrderBy} py-1 w-64 bg-white h-[40px]
            sm:mt-2 border border-slate-800`}
            style={{ width: "200px" }}
            defaultValue="label"
          >
            {sort === "label" ? (
              <option value="label" className="font-sans text-slate-700">
                並べ替え
              </option>
            ) : (
              <option value="random" className="font-sans text-slate-700">
                ランダム
              </option>
            )}
            <option value="sales_count" className="font-sans text-slate-700">
              人気順
            </option>
            <option value="price" className="font-sans text-slate-700">
              価格(低⇨高)
            </option>
          </select>
        </div>
      </div>
      <div className={`w-[65px] ${styles.ClearBtnBox}`}>
        <button
          onClick={() => handleClearFilter()}
          className={`${styles.ClearBtn} px-1 h-[34px]
            bg-amber-950 text-white hover:opacity-50`}
        >
          クリア
        </button>
      </div>
    </div>
  );
};

export default Filter;
