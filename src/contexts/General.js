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
};

export function GeneralProvider(props) {
  const [state, setState] = useReducer(reducer, initialState);

  return (
    <GeneralContext.Provider value={{ state, setState }}>
      {props.children}
    </GeneralContext.Provider>
  );
}
