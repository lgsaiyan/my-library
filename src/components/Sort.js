import React from "react";

const Sort = () => {
  return (
    <React.Fragment>
      <div className="sort">
        <div className="sort__menu btn">Sort by: date added</div>
        <svg className="sort__btn circle-btn">
          <use xlinkHref="img/sprite.svg#icon-circle-up"></use>
        </svg>
        <svg className="sort__btn circle-btn">
          <use xlinkHref="img/sprite.svg#icon-circle-down"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Sort;
