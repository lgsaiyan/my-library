import React, { useContext, useEffect, useState } from "react";
import RenderedList from "./RenderedList";
import { SearchContext } from "../contexts/Search";
import { GeneralContext } from "../contexts/General";
import history from "../history";
import { computePagination } from "./Pagination";

/**
 * Renders the users library of books OR the search results.
 * @param {*} theUsersBooks
 * @returns react library component.
 */

const Library = ({ theUsersBooks }) => {
  console.log("I rendered Library");
  // Init consts
  //const [data, setData] = useState(null);
  const { searchData } = useContext(SearchContext);
  const { state, setState } = useContext(GeneralContext);
  const location = history.location.pathname;
  let fauxData = null;

  const updateState = () => {
    const updatePagination = () => {
      const fauxPaginationInfo = computePagination(
        fauxData,
        state.booksPerPage,
        state.page
      );

      const paginationData = fauxPaginationInfo.paginationData;
      const totalPages = fauxPaginationInfo.totalPages;
      // if (state.masterData === fauxData) {
      //   return null;
      // } else {
      setState({
        paginationData: paginationData,
        totalPages: totalPages,
      });
      if (state.page === null) {
        setState({ page: 1 });
      }
      // }
    };

    const updateMasterData = () => {
      if (state.masterData === fauxData) {
        return null;
      } else {
        setState({ masterData: fauxData });
      }
    };

    const updateUserBooks = () => {
      if (state.userBooks === fauxData) {
        return null;
      } else if (theUsersBooks !== null && location === "/home") {
        setState({ userBooks: theUsersBooks });
        console.log("I updated userBooks state with :");
        console.log(theUsersBooks);
        console.log(state.userBooks);
      }
    };
    updateUserBooks();
    updateMasterData();
    if (fauxData !== "empty" && fauxData !== null) {
      updatePagination();
    }
  };

  // Function to determine which data gets passed down to renderedList (based on path location)
  const determineData = async () => {
    try {
      //console.log("Ran determine data");
      if (location === "/search") {
        //console.log(`Search Data in Library component: ${searchData}`);
        if (searchData !== null) {
          if (
            searchData.results !== null /*&&
            searchData.results !== state.currentData*/
          ) {
            //setData(searchData.results);
            fauxData = searchData.results;
          } else {
            return null;
          }
        }
      } else if (location === "/home") {
        if (theUsersBooks !== null /*&& theUsersBooks !== state.currentData*/) {
          //setData(theUsersBooks);
          fauxData = theUsersBooks;
          //console.log("userbooks is full of books");
        }
      } else {
        //setData("empty");
        fauxData = "empty";
        //console.log("I set data to empty");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const determineAndUpdateData = async () => {
    //if (theUsersBooks !== null) {
    await determineData();
    //console.log(fauxData);
    //console.log("determineDataFinished");
    updateState();
    // }
  };

  useEffect(() => {
    determineAndUpdateData();
  }, [theUsersBooks, searchData, state.page]);

  return (
    <React.Fragment>
      <div class="library">
        <RenderedList />
      </div>
    </React.Fragment>
  );
};

export default Library;
