import React, { useContext } from "react";
import { SearchContext } from "../contexts/Search";
import history from "../history";

const Clear = () => {
  const { setSearchData } = useContext(SearchContext);
  const onClick = () => {
    setSearchData({ results: null });
    history.push("/home");
  };

  return (
    <React.Fragment>
      <div class="exit">
        <span class="exit__text">Search Results</span>
        <div onClick={onClick}>
          <svg class="exit__btn">
            <use xlinkHref="img/sprite.svg#icon-cancel-circle"></use>
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Clear;
