import { HOME_LOCATION, ROOT_LOCATION } from "../constants";

export const determineLocationPath = (authStatus, location) => {
  if (authStatus === true && location === ROOT_LOCATION) {
    return HOME_LOCATION;
  } else if (authStatus === false) {
    return ROOT_LOCATION;
  }

  return location;
};

export const determineBooksPerPage = () => {
  //Results per page based on viewport width (px)
  // at 823 = 12
  // at 1365 = 10
  // at 1636 = 12
  // at 1906 = 14
  // at 2177 = 16

  let width = window.innerWidth;
  let newBooksPerPage;

  if (width < 1365) {
    newBooksPerPage = 12;
  } else if (width >= 1365 && width < 1636) {
    newBooksPerPage = 10;
  } else if (width >= 1636 && width < 1906) {
    newBooksPerPage = 12;
  } else if (width >= 1906 && width < 2177) {
    newBooksPerPage = 14;
  } else if (width >= 2177) {
    newBooksPerPage = 16;
  } else {
    newBooksPerPage = 10;
  }

  return newBooksPerPage;
};
