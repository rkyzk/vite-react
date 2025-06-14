import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import styles from "../styles/Filter.module.css";

const Filter = () => {
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState(0);

  const categories = [
    { categoryId: 1, categoryName: "tulips" },
    { categoryId: 2, categoryName: "hyacinth" },
    { categoryId: 3, categoryName: "crocus" },
  ];

  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    const handler = setTimeout(() => {
      category === 0
        ? searchParams.delete("category")
        : searchParams.set("category", category);
      // Trim spaces of keywords. Replace spaces in the middle with '_'
      let trimmedKeywords = keywords.trim();
      let searchTerms = trimmedKeywords.replace(/\s+/g, "_");
      searchTerms === ""
        ? searchParams.delete("keywords")
        : searchParams.set("keywords", searchTerms);
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 700);

    return () => clearTimeout(handler);
  }, [category, keywords]);

  const handleClearFilter = () => {
    setCategory(0);
    setKeywords("");
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex justify-end mx-auto gap-2 pr-5">
      {/* Search box */}
      <input
        type="text"
        placeholder="enter keyword"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="border-gray-500 rounded-md bg-stone-100
                   h-12 px-1 py-2 w-64"
      ></input>
      {/* Category drowdown */}
      <div>
        <FormControl className="w-40 focus:outline-none" size="small">
          <InputLabel labelId="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="category"
            className="py-1 bg-white focus:outline-gray focus:outline-none"
          >
            {category !== 0 && (
              <MenuItem key={0} value={0}>
                all
              </MenuItem>
            )}
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryId}>
                <span className={`${styles.SelectItems} "text-slate-700"`}>
                  {item.categoryName}
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <button
        onClick={handleClearFilter}
        className="bg-stone-500 py-1 px-2 h-10"
      >
        clear
      </button>
    </div>
  );
};

export default Filter;
