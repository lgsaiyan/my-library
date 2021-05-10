import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Sort from "../components/Sort";
import Library from "../components/Library";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import history from "../history";
import google from "../api/googleBooks";
import { GeneralContext } from "../contexts/General";
import LoadSpinner from "../LoadSpinner/LoadSpinner";

const Home = () => {
  const { state, setState } = useContext(GeneralContext);
  //const [books, setBooks] = useState(null);

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
      console.log(results);

      // Set data in State -- Verify where to keep state data, local as prop passed down to Library component, or in Context.
      setState({ userBooks: results });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state.authStatus === true) {
      getUsersBooks();
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="content">
        <Sort />
        <Library userBooks={state.userBooks} />
        <Pagination />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
