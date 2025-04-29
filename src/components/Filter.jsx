import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

const Filter = () => {
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    { categoryId: 2, categoryName: "tulips" },
    { categoryId: 3, categoryName: "hyacinth" },
    { categoryId: 4, categoryName: "crocus" },
  ];

  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      category === "all" || category === ""
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
    navigate({ pathname: window.location.pathname });
  };

  return (
    <div className="flex justify-end w-10/12 mx-auto">
      {/* Search box */}
      <input
        type="text"
        placeholder="enter keyword"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="border-gray-500 rounded-md bg-stone-100
                   h-12 px-2 py-1 w-64 mr-1"
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
          >
            {category !== "all" && (
              <MenuItem key={1} value="all">
                unselect
              </MenuItem>
            )}
            {categories.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryName}>
                <span className="text-slate-700">{item.categoryName}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <button
        onClick={handleClearFilter}
        className="bg-stone-500 text-white rounded-md h-12 w-16 px-2 py-1 ml-1"
      >
        clear
      </button>
    </div>
  );
};

export default Filter;
