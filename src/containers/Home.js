import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Sort from "../components/Sort";
import Library from "../components/Library";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import google from "../api/googleBooks";
import { GeneralContext } from "../contexts/General";

const Home = () => {
  const { setState, state } = useContext(GeneralContext);
  const [theUsersBooks, setTheUsersBooks] = useState(null);
  console.log("I rendered Home");

  const getUsersBooks = async () => {
    try {
      const response = await google.get("/mylibrary/bookshelves/0/volumes", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });

      const results = Object.values(response.data.items);

      setTheUsersBooks(results);
      console.log("Got the usersbook from HOME!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    /*if (state.previousLocation === "detail")
      setState({ previousLocation: null });
    else*/ if (state.authStatus === true) {
      getUsersBooks();
      console.log("UseEffect triggered in HOME");
    }
  }, [state.accessToken]);

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
