import React, { useContext, useEffect } from "react";
import RenderedList from "./RenderedList";
import { SearchContext } from "../contexts/Search";
import { GeneralContext } from "../contexts/General";
import history from "../history";
import { sampleGuestData } from "../data";
import { computePagination } from "./Pagination";
import {
  sortFunctionDateAdded,
  sortFunctionDatePublished,
  sortFunctionLength,
  reOrder,
} from "./Sort";
import { GUEST_STATUS, HOME_LOCATION, SEARCH_LOCATION } from "../constants";

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

  /**
   * Determines whether to provide sample data or make an api request.
   */
  const determineDataType = async () => {
    try {
      if (location === SEARCH_LOCATION) {
        if (searchData !== null) {
          if (searchData.results !== null) {
            fauxData = searchData.results;
          } else {
            return;
          }
        }
      } else if (location === HOME_LOCATION && state.authStatus === true) {
        if (theUsersBooks !== null) {
          fauxData = theUsersBooks;
        }
      } else if (state.authStatus === GUEST_STATUS) {
        fauxData = sampleGuestData;
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Sorts data based on the provided sorting type.
   */
  const sortData = async () => {
    if (location === HOME_LOCATION) {
      try {
        if (fauxData !== undefined && fauxData !== null) {
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

  /**
   * Updates the react state with data to display.
   */
  const updateState = () => {
    // TODO: Refactor the functions in this block
    const updatePagination = () => {
      if (
        fauxData !== undefined &&
        fauxData !== null /*&& fauxData !== "empty"*/
      ) {
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
      } else if (theUsersBooks !== null && location === HOME_LOCATION) {
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
