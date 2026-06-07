import Pagination from "@mui/material/Pagination";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PaginationSection = ({ totalPages }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const [currPage, setCurrPage] = useState(1);
  const navigate = useNavigate();

  const onChangeHandler = (event, value) => {
    params.set("page", value);
    setCurrPage(value);
    navigate(`${pathname}?${params}`);
  };

  console.log("curPage: " + currPage);
  return (
    <div className="flex pb-1">
      <Pagination
        className="mx-auto"
        count={totalPages}
        page={currPage}
        size="small"
        onChange={onChangeHandler}
        showFirstButton
      />
    </div>
  );
};

export default PaginationSection;
