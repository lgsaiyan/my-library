import React from "react";
import Header from "../components/Header";
import Sort from "../components/Sort";
import Library from "../components/Library";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="content">
        <Sort />
        <Library />
        <Pagination />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
