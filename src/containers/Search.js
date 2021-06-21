import React from "react";
import Header from "../components/Header";
import Clear from "../components/Clear";
import Library from "../components/Library";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

/**
  *Renders search page 
  */
const Search = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="content__search">
        <Clear />
        <Library />
        <Pagination />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Search;
