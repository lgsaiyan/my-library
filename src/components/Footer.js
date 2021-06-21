import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";

/**
  *Renders footer component 
  */
const Footer = () => {
  const { state } = useContext(GeneralContext);

  const getTotal = () => {
    if (state.userBooks !== null) {
      return state.userBooks.length;
    } else {
      return 0;
    }
  };

  return (
    <React.Fragment>
      <footer className="footer">
        <div className="total">Total Books: {getTotal()}</div>
        <br />
        <div className="copy-right">&copy; Copyright 2021 Levon Saiyan</div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
