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
  const [sort, setSort] = useState("random");
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
      sort === "random"
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
    setSort("random");
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex-col items-center">
      <div
        className={`${styles.InputGroup} flex flex-col mx-auto mt-4 gap-2 w-auto sm:flex-row justify-center`}
      >
        {/* Search box */}
        <input
          type="text"
          placeholder="キーワードを入力"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className={`${styles.SerachInput} border border-gray-900 rounded-md bg-stone-100
                   h-12 px-1 py-2`}
        />
        {/* Category drowdown */}
        <div className="flex gap-1 w-[280px]">
          <FormControl className="focus:outline-none" size="small">
            <InputLabel labelId="category-select-label">花種</InputLabel>
            <Select
              labelId="category-select-label"
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              label="category"
              className="py-1 w-64 bg-white border-none outline-none focus:outline-gray focus:outline-none"
              style={{ width: "150px" }}
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
          <CheckboxesGroup
            colorState={colorState}
            setColorState={setColorState}
            setColors={setColors}
            colorLabel={colorLabel}
            setColorLabel={setColorLabel}
          />
        </div>
        <button
          onClick={() => handleClearFilter()}
          className={`${styles.ClearBtn} px-1 h-[34px] mt-2 bg-amber-950 text-white hover:opacity-50 xs:width=[320px]`}
        >
          クリア
        </button>
      </div>
      <div className={`${styles.InputGroup} mx-auto px-3`}>
        <FormControl
          size="small"
          className="mt-2 outline-none focus:outline-gray active:outline-black"
        >
          <InputLabel id="select-label">並べ替え</InputLabel>
          <Select
            labelId="select-label"
            id="simple-select"
            value={sort}
            label="並べ替え"
            onChange={(e) => setSort(e.target.value)}
            className="py-1 w-64 bg-white"
            style={{ width: "150px" }}
          >
            <MenuItem value="random">
              <span className={`${styles.SelectItems} text-slate-700`}>
                ランダム
              </span>
            </MenuItem>
            <MenuItem value="sales_count">
              <span className={`${styles.SelectItems} text-slate-700`}>
                人気順
              </span>
            </MenuItem>
            <MenuItem value="price">
              <span className={`${styles.SelectItems} text-slate-700`}>
                価格(安い順)
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Filter;
