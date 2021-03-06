import React, { useReducer } from "react";

export const GeneralContext = React.createContext([]);

const reducer = (state, setState) => ({
  ...state,
  ...setState,
});

const initialState = {
  bookID_for_detail: null,
  authStatus: null,
  accessToken: null,
  userBooks: null,
  masterData: null,
  paginationData: null,
  page: 1,
  totalPages: null,
  booksPerPage: 10,
  previousLocation: null,
  sortState: "Date Added",
  orderState: "up",
  usingSampleData: false,
};

export function GeneralProvider(props) {
  const [state, setState] = useReducer(reducer, initialState);

  return (
    <GeneralContext.Provider value={{ state, setState }}>
      {props.children}
    </GeneralContext.Provider>
  );
}
