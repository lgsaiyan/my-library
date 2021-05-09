import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Sort from "../components/Sort";
import Library from "../components/Library";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import history from "../history";
import google from "../api/googleBooks";
import { GeneralContext } from "../contexts/General";

const Home = () => {
  const { state } = useContext(GeneralContext);
  const [books, setBooks] = useState(null);

  //console.log(history.location.pathname);

  //Get users book info in console

  const getUsersBooks = async () => {
    //Make API request
    try {
      const response = await google.get("/mylibrary/bookshelves/0/volumes", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });

      //Convert google data into Array
      const results = Object.values(response.data.items);
      //console.log("These are the request results: " + response + results);
      console.log(results);
      //console.log(response.data.items[5]);

      // Set data in State -- Verify where to keep state data, local as prop passed down to Library component, or in Context.
      setBooks(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsersBooks();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="content">
        <Sort />
        <Library userBooks={books} />
        <Pagination />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
