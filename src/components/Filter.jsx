import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../styles/Filter.module.css";
import { fetchCategories, clearErrorMessage } from "../store/actions";

const Filter = ({ categoryId }) => {
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState(categoryId);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.categories);
  const { errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      errorMessage && dispatch(clearErrorMessage());
      category === 0
        ? searchParams.delete("category")
        : searchParams.set("category", category);
      // Trim spaces of keywords. Replace spaces in the middle with '_'
      let trimmedKeywords = keywords.trim();
      let searchTerms = trimmedKeywords.replace(/\s+/g, "_");
      searchTerms === ""
        ? searchParams.delete("keywords")
        : searchParams.set("keywords", searchTerms);
      navigate(`?${searchParams.toString()}`);
    }, 700);
    return () => clearTimeout(handler);
  }, [category, keywords]);

  useEffect(() => {
    setCategory(Number(categoryId));
    Object.keys(categories).length === 0 && dispatch(fetchCategories());
  }, []);

  const handleClearFilter = () => {
    setCategory(0);
    setKeywords("");
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex flex-col mx-auto mt-2 gap-2 sm:flex-row sm:justify-center">
      {/* Search box */}
      <input
        type="text"
        placeholder="キーワードを入力"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="border-gray-500 rounded-md bg-stone-100
                   h-12 px-1 py-2"
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
      <button
        onClick={() => handleClearFilter()}
        className={`${styles.ClearBtn} px-1 h-[34px] hover:bg-neutral-600 hover:text-white`}
      >
        クリア
      </button>
    </div>
  );
};

export default Filter;
