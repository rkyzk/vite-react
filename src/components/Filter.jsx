import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../styles/Filter.module.css";
import { fetchCategories, clearErrorMessage } from "../store/actions";
import CheckboxesGroup from "./shared/CheckboxesGroup";

const Filter = ({ categoryId }) => {
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState(categoryId);
  const [colors, setColors] = useState("");
  const [colorLabel, setColorLabel] = useState("");
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
      if (category === null || category === "" || category === "null") {
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
      navigate(`?${searchParams.toString()}`);
    }, 700);
    return () => clearTimeout(handler);
  }, [category, keywords, colors]);

  useEffect(() => {
    Object.keys(categories).length === 0 && dispatch(fetchCategories());
  }, []);

  const handleClearFilter = () => {
    setCategory("");
    setKeywords("");
    setColors("");
    setColorState(initialColorState);
    setColorLabel("");
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="px-2 flex flex-col mx-auto mt-4 gap-2 sm:px-8 sm:w-auto sm:flex-row sm:justify-center">
      {/* Search box */}
      <input
        type="text"
        placeholder="キーワードを入力"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="border border-gray-900 rounded-md bg-stone-100
                   h-12 px-1 py-2 max-w-[300px]"
      />
      {/* Category drowdown */}
      <div>
        <FormControl className="focus:outline-none" size="small">
          <InputLabel labelId="category-select-label">花種</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={(e) => setCategory(Number(e.target.value))}
            label="category"
            className="py-1 w-64 bg-white focus:outline-gray focus:outline-none"
          >
            {category !== 0 && (
              <MenuItem key={0} value={0}>
                すべて
              </MenuItem>
            )}
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryId}>
                <span className={`${styles.SelectItems} text-slate-700`}>
                  {item.categoryName}
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <CheckboxesGroup
        colorState={colorState}
        setColorState={setColorState}
        setColors={setColors}
        colorLabel={colorLabel}
        setColorLabel={setColorLabel}
      />
      <button
        onClick={() => handleClearFilter()}
        className="px-1 h-[34px] mt-2 bg-amber-950 text-white hover:opacity-50 xs:width=[320px]"
      >
        クリア
      </button>
    </div>
  );
};

export default Filter;
