import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "../contexts/Search";

const Clear = () => {
  const { setSearchData } = useContext(SearchContext);
  const onClick = () => {
    setSearchData({ results: null });
  };

  return (
    <React.Fragment>
      <div class="exit">
        <span class="exit__text">Search Results</span>
        <Link to="/home" onClick={onClick}>
          <svg class="exit__btn">
            <use xlinkHref="img/sprite.svg#icon-cancel-circle"></use>
          </svg>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Clear;
