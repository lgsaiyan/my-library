import React from "react";

const Pagination = () => {
  return (
    <React.Fragment>
      <div className="pages">
        <svg className="pages__left circle-btn">
          <use xlinkHref="img/sprite.svg#icon-circle-left"></use>
        </svg>
        <span className="pages__current"> 1 </span>
        <svg className="pages__right circle-btn">
          <use xlinkHref="img/sprite.svg#icon-circle-right"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Pagination;
