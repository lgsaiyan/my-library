import React, { useState, useContext } from "react";
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
  console.log("Token at HOME: " + state.accessToken);

  // const bookData = () => {
  //   if (history.location.pathname === "/home") {
  //     console.log("home");
  //     //set data to users books
  //   } else if (history.location.pathname === "/search") {
  //     console.log("search");
  //     //set data to search results
  //   }
  // };

  //console.log(history.location.pathname);

  //Get users book info in console

  const getUsersBooks = async () => {
    //Make API request
    try {
      const response = await google.get("/mylibrary/bookshelves", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
        // params: {
        //   shelf: 0,
        // },
      });

      //Convert google data into Array
      const results = Object.values(response.data.items);
      console.log("These are the request results: " + results);

      // Set data in State
      setBooks(results);
    } catch (err) {
      console.log(err);
    }
  };

  getUsersBooks();

  // Alternative GET REQUEST per google documentation
  // var request = gapi.client.request({
  //   'method': 'GET',
  //   'path': '/drive/v3/about',
  //   'params': {'fields': 'user'}
  // });
  // // Execute the API request.
  // request.execute(function(response) {
  //   console.log(response);
  // });

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
