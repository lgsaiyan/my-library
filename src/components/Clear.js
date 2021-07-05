import React, { useContext } from "react";
import { SearchContext } from "../contexts/Search";
import { GeneralContext } from "../contexts/General";
import history from "../history";
import { HOME_LOCATION } from "../constants";

/**
  *Renders clear search results button
  */
const Clear = () => {
  const { setSearchData } = useContext(SearchContext);
  const { setState } = useContext(GeneralContext);

  const onClick = () => {
    setSearchData({ results: null });
    setState({ page: 1 });
    history.push(HOME_LOCATION);
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
