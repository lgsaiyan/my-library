import React, { useContext, useEffect } from "react";
import RenderedList from "./RenderedList";
import { SearchContext } from "../contexts/Search";
import { GeneralContext } from "../contexts/General";
import history from "../history";
import { computePagination } from "./Pagination";
import {
  sortFunctionDateAdded,
  sortFunctionDatePublished,
  sortFunctionLength,
  reOrder,
} from "./Sort";

/**
 * Renders the users library of books OR the search results.
 * @param {*} theUsersBooks
 * @returns react library component.
 */

const Library = ({ theUsersBooks }) => {
  const { searchData } = useContext(SearchContext);
  const { state, setState } = useContext(GeneralContext);
  const location = history.location.pathname;
  let fauxData = null;

  console.log("I rendered Library, page: " + state.page);

  const determineDataType = async () => {
    try {
      if (location === "/search") {
        if (searchData !== null) {
          if (searchData.results !== null) {
            fauxData = searchData.results;
          } else {
            return null;
          }
        }
      } else if (location === "/home") {
        if (theUsersBooks !== null) {
          fauxData = theUsersBooks;
        }
      } else {
        fauxData = "empty";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sortData = async () => {
    if (location === "/home") {
      try {
        if (
          fauxData !== undefined &&
          fauxData !== null &&
          fauxData !== "empty"
        ) {
          //Maybe we don't need this since same as getUserBooks order???
          if (state.sortState === "Date Added") {
            fauxData = sortFunctionDateAdded(fauxData);
          }
          if (state.sortState === "Date Published") {
            fauxData = sortFunctionDatePublished(fauxData);
          }
          if (state.sortState === "Length") {
            fauxData = sortFunctionLength(fauxData);
          }
        }
      } catch (err) {}

      if (state.orderState === "down") {
        fauxData = reOrder(fauxData);
      }
    }
  };

  const updateState = () => {
    const updatePagination = () => {
      if (fauxData !== undefined && fauxData !== null && fauxData !== "empty") {
        const fauxPaginationInfo = computePagination(
          fauxData,
          state.booksPerPage,
          state.page
        );

        const paginationData = fauxPaginationInfo.paginationData;
        const totalPages = fauxPaginationInfo.totalPages;

        setState({
          paginationData: paginationData,
          totalPages: totalPages,
        });
        if (state.page === null) {
          setState({ page: 1 });
        }
      }
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
      }
    };

    updateUserBooks();
    updateMasterData();
    updatePagination();
  };

  const determineAndUpdateData = async () => {
    await determineDataType();
    await sortData();
    updateState();
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
