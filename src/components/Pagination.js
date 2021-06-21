import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";

/**
  *Renders pagination component 
  */
const Pagination = () => {
  const { state, setState } = useContext(GeneralContext);

  const scrollReset = () => {
    window.scrollTo(0, 0);
  };

  let page = state.page;
  let totalPages = state.totalPages;

  const handlePrev = () => {
    if (page === 1) return;
    setState({ page: page - 1 });
    scrollReset();
  };

  const handleNext = () => {
    if (page === totalPages) return;
    setState({ page: page + 1 });
    scrollReset();
  };

  return (
    <React.Fragment>
      <div className="pages">
        <svg
          className="pages__left circle-btn"
          onClick={handlePrev}
          style={page === 1 ? { visibility: `hidden` } : { display: `block` }}
        >
          <use xlinkHref="img/sprite.svg#icon-circle-left"></use>
        </svg>
        <span className="pages__current">
          {" "}
          {page} / {totalPages}{" "}
        </span>
        <svg
          className="pages__right circle-btn"
          onClick={handleNext}
          style={
            page === totalPages || totalPages < 2
              ? { visibility: `hidden` }
              : { display: `block` }
          }
        >
          <use xlinkHref="img/sprite.svg#icon-circle-right"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Pagination;

export const computePagination = (data, booksPerPage, page) => {
  let totalBooks = data.length;

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  totalBooks = data.length;
  let totalPages = Math.ceil(totalBooks / booksPerPage);
  const paginationData = paginate(data, booksPerPage, page);
  const result = { paginationData, totalPages };

  return result;
};
