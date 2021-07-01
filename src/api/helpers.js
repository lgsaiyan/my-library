export const determineLocationPath = (authStatus, location) => {
  if (authStatus === true && location === "/") {
    return "/home";
  } else if (authStatus === false) {
    return "/";
  }

  return location;
};