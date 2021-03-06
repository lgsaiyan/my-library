import React from "react";

const Clear = () => {
  return (
    <React.Fragment>
      <div class="exit">
        <span class="exit__text">Search Results</span>
        <svg class="exit__btn">
          <use xlinkHref="img/sprite.svg#icon-cancel-circle"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Clear;
