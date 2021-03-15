import React from "react";
import { Link } from "react-router-dom";

const Clear = () => {
  return (
    <React.Fragment>
      <div class="exit">
        <span class="exit__text">Search Results</span>
        <Link to="/home">
          <svg class="exit__btn">
            <use xlinkHref="img/sprite.svg#icon-cancel-circle"></use>
          </svg>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Clear;
