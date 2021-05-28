import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Sort from "../components/Sort";
import Library from "../components/Library";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import google from "../api/googleBooks";
import { GeneralContext } from "../contexts/General";
import Spinner from "../LoadSpinner/LoadSpinner";

const Home = () => {
  const { state, setState } = useContext(GeneralContext);
  const [theUsersBooks, setTheUsersBooks] = useState(null);
  console.log("I rendered Home");
  //Get users book info in console
  //let theUsersBooks;
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

      // Set data in State -- Verify where to keep state data, local as prop passed down to Library component, or in Context.
      // if (state.userBooks === results) {
      //   return null;
      // } else {
      //   setState({ userBooks: results });
      // }
      //theUsersBooks = results;
      setTheUsersBooks(results);
      console.log("Got the usersbook from HOME");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state.authStatus === true) {
      getUsersBooks();
      console.log("UseEffect triggered in HOME");
    }
  }, [state.accessToken]);

  // if (!state.authStatus) {
  //   return <Spinner />;
  // }

  return (
    <React.Fragment>
      <Header />
      <div className="content">
        <Sort />
        <Library theUsersBooks={theUsersBooks} />
        <Pagination />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
