import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Sort from "../components/Sort";
import Library from "../components/Library";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import google from "../api/googleBooks";
import { GeneralContext } from "../contexts/General";
import { sampleUserData } from "../api/sampleUserData";

/**
 *Renders home page
 */
const Home = () => {
  const { state, setState } = useContext(GeneralContext);
  const [theUsersBooks, setTheUsersBooks] = useState(null);
  console.log("I rendered Home");

  const getUsersBooks = async () => {
    try {
      const response = await google.get("/mylibrary/bookshelves/0/volumes", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      console.log(response.data.items);
      if (response.data.items !== null && response.data.items !== undefined) {
        const results = Object.values(response.data.items);
        setTheUsersBooks(results);
        if (state.usingSampleData === true) {
          setState({ usingSampleData: false });
        }
        console.log("Got the usersbook from HOME!");
      } else {
        setTheUsersBooks(sampleUserData());
        setState({ usingSampleData: true });
        console.log("I set sample user data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state.authStatus === true) {
      getUsersBooks();
    }
  }, [state.accessToken, state.usingSampleData]);

  console.log(theUsersBooks);

  return (
    <React.Fragment>
      <Header />
      <div className="content">
        <Sort />
        <Library theUsersBooks={theUsersBooks} />
        <Pagination booksPerPage={5} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
