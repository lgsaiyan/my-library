import React, { useContext, useEffect, useState } from "react";
import RenderedList from "./RenderedList";
import { SearchContext } from "../contexts/Search";
import { GeneralContext } from "../contexts/General";
import history from "../history";

/**
 * Remders the users library of books.
 * @param {*} theUsersBooks
 * @returns react library component.
 */

const Library = ({ theUsersBooks }) => {
  console.log("I rendered Library");
  // Init consts
  const [data, setData] = useState(null);
  const { searchData } = useContext(SearchContext);
  const { state, setState } = useContext(GeneralContext);
  let fauxData = null;

  //Functions to update Context State if necessary
  const getCurrentData = () => {
    if (state.currentData === fauxData) {
      return null;
    } else {
      return fauxData;
    }
  };

  const getUserBooks = () => {
    if (state.userBooks === theUsersBooks) {
      return null;
    } else {
      return theUsersBooks;
    }
  };

  const updateState = () => {
    const userBookData = getUserBooks();
    const booksCurrentData = getCurrentData();
    const stateUpdate = {};

    if (userBookData !== null) {
      stateUpdate.userBooks = userBookData;
    }

    if (booksCurrentData !== null) {
      stateUpdate.currentData = booksCurrentData;
    }

    console.log("I am setting detail data state");
    setState(stateUpdate);
  };

  // Function to determine which data gets passed down to renderedList (based on path location)
  const determineData = async () => {
    try {
      const location = history.location.pathname;
      //console.log("Ran determine data");
      if (location === "/search") {
        //console.log(`Search Data in Library component: ${searchData}`);
        if (searchData !== null) {
          if (searchData.results !== null && searchData.results !== data) {
            setData(searchData.results);
            fauxData = searchData.results;
          } else {
            return null;
          }
        }
      } else if (location === "/home") {
        if (theUsersBooks !== null && theUsersBooks !== data) {
          setData(theUsersBooks);
          fauxData = theUsersBooks;
          //console.log("userbooks is full of books");
        }
      } else {
        setData("empty");
        fauxData = "empty";
        //console.log("I set data to empty");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const determineAndUpdateData = async () => {
    if (theUsersBooks !== null) {
      await determineData();
      console.log(fauxData);
      console.log("determineDataFinished");
      updateState();
    }
  };

  useEffect(() => {
    determineAndUpdateData();
  }, [theUsersBooks, searchData]);

  return (
    <React.Fragment>
      <div class="library">
        <RenderedList data={data} />
      </div>
    </React.Fragment>
  );
};

export default Library;
