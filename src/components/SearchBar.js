import React, { useState, useEffect, useContext } from "react";
import google from "../api/googleBooks";
import { SearchContext } from "../contexts/Search";
import history from "../history";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const { setSearchData } = useContext(SearchContext);

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  const query = async () => {
    //Make API request with query term
    try {
      const response = await google.get("/volumes?", {
        params: {
          q: term,
        },
      });

      //Convert google data into Array
      const results = Object.values(response.data.items);
      console.log(results);

      // Set data in Search Context
      setSearchData({ results });
    } catch (err) {
      console.log(err);
    }
  };

  // ON SUBMIT
  const onSubmit = async () => {
    console.log("This is the query term in onSubmit: " + term);
    // API request
    query();

    //Route to search results page
    history.push("/search");
  };

  // useEffect(() => {
  //   //console.log(results);
  //   console.log(searchData);
  //   //setSearchData({ results });
  // }, [searchData]);

  // ON KEY PRESS
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Upon enter" + term);
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
