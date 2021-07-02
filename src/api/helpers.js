import { HOME_LOCATION, ROOT_LOCATION } from "../constants";

export const determineLocationPath = (authStatus, location) => {
  if (authStatus === true && location === ROOT_LOCATION) {
    return HOME_LOCATION;
  } else if (authStatus === false) {
    return ROOT_LOCATION;
  }

  return location;
};