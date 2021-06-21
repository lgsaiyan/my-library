import React, { useState, useEffect, useContext } from "react";
import google from "../api/googleBooks";
import { SearchContext } from "../contexts/Search";
import { GeneralContext } from "../contexts/General";
import history from "../history";

/**
  *Renders searchbar component 
  */
const SearchBar = () => {
  const [term, setTerm] = useState("");
  const { setSearchData } = useContext(SearchContext);
  const { setState } = useContext(GeneralContext);

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  const query = async () => {
    try {
      const response = await google.get("/volumes?", {
        params: {
          q: term,
        },
      });

      const results = Object.values(response.data.items);
      setSearchData({ results });
      setState({ page: 1 });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    query();
    history.push("/search");
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        onSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [term]);

  return (
    <React.Fragment>
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search for books here..."
          value={term}
          onChange={onInputChange}
        />
        <button className="search-bar__btn" onClick={onSubmit}>
          <img
            className="search-bar__icon"
            src="img/svg/search.svg"
            alt="mag-glass"
          ></img>
        </button>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
