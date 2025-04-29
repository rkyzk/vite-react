import { useState, useEffect } from "react";
import { storeSearchTerms, setCategory } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons";

const Filter = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  // const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchPhrase) {
        let trimmed = searchPhrase.trim();
        let searchTerms = trimmed.replace(/\s+/g, "&");
        dispatch(storeSearchTerms(searchTerms));
      }
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [dispatch, searchPhrase]);

  const handleClearKeyword = () => {
    setSearchPhrase("");
    dispatch(storeSearchTerms(""));
  };

  return (
    <div className="flex justify-end w-10/12 mx-auto">
      <input
        type="text"
        placeholder="enter keyword"
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
        className="border-gray-500 rounded-b-sm bg-stone-100 px-2 py-1 w-64 mr-1"
      >
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </input>
      <button
        onClick={handleClearKeyword}
        className="bg-stone-500 text-white rounded-sm px-2 py-1"
      >
        clear
      </button>
    </div>
  );
};

export default Filter;
