import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";

export const computePagination = (data, booksPerPage, page) => {
  console.log("I ran compute Pagination");

  let totalBooks = data.length;

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  totalBooks = data.length;
  let totalPages = Math.ceil(totalBooks / booksPerPage);
  console.log(totalPages);
  const paginationData = paginate(data, booksPerPage, page);
  console.log(paginationData);

  const result = { paginationData, totalPages };
  return result;
};

const Pagination = () => {
  const { state, setState } = useContext(GeneralContext);
  console.log("I rendered Pagination");

  const scrollReset = () => {
    window.scrollTo(0, 0);
  };

  let page = state.page;
  let totalPages = state.totalPages;

  const handlePrev = () => {
    if (page === 1) return;

    //setPage(page - 1);
    setState({ page: page - 1 });
    scrollReset();
  };

  const handleNext = () => {
    if (page === totalPages) return;
    //setPage(page + 1);
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
            page === totalPages
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

// import React, { useContext, useState } from "react";
// import { GeneralContext } from "../contexts/General";

// const Pagination = ({ booksPerPage }) => {
//   const { state, setState } = useContext(GeneralContext);
//   const [page, setPage] = useState(1);
//   console.log("I rendered Pagination");

//   let totalBooks = null;
//   let totalPages = null;
//   let newPaginationData = null;

//   const paginate = (array, page_size, page_number) => {
//     return array.slice((page_number - 1) * page_size, page_number * page_size);
//   };

//   const compareArrays = (a, b) => {
//     a.length === b.length && a.every((v, i) => v === b[i]);
//   };

//   if (state.currentData !== null && state.currentData !== "empty") {
//     totalBooks = state.currentData.length;
//     totalPages = Math.ceil(totalBooks / booksPerPage);
//     console.log(totalPages);
//     newPaginationData = paginate(state.currentData, booksPerPage, page);
//     console.log(state.paginationData);
//     console.log(newPaginationData);
//     if (state.pagination === null) {
//       // const equals = compareArrays(state.paginationData, newPaginationData);
//       // console.log(compareArrays);
//       // if (equals === false) {
//       return setState({ paginationData: newPaginationData });
//       //console.log("Set Pagination State");
//       //}
//     } else {
//       // const equals = compareArrays(state.paginationData, newPaginationData);
//       // console.log(compareArrays);
//       // if (equals === false) {
//       //   return setState({ paginationData: newPaginationData });
//       // }
//     }
//   }

//   const handlePrev = () => {
//     if (page === 1) return;
//     setPage(page - 1);
//     setState({ paginationData: newPaginationData });
//   };

//   const handleNext = () => {
//     if (page === totalPages) return;
//     setPage(page + 1);
//     setState({ paginationData: newPaginationData });
//   };

//   return (
//     <React.Fragment>
//       <div className="pages">
//         <svg className="pages__left circle-btn" onClick={handlePrev}>
//           <use xlinkHref="img/sprite.svg#icon-circle-left"></use>
//         </svg>
//         <span className="pages__current">
//           {" "}
//           {page} / {totalPages}{" "}
//         </span>
//         <svg className="pages__right circle-btn" onClick={handleNext}>
//           <use xlinkHref="img/sprite.svg#icon-circle-right"></use>
//         </svg>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Pagination;
