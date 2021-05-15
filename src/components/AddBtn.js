import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";

const AddBtn = () => {
  const { state } = useContext(GeneralContext);

  // Check status of book (to set button status)
  console.log(state.bookID_for_detail);
  console.log(state.userBooks);
  let validate;
  if (state.userbooks) {
    validate = state.userBooks.find((el) => el.id === state.bookID_for_detail);
  } else {
    validate = undefined;
  }
  console.log(validate);
  //} else {
  //return
  // }

  const button = () => {
    if (validate !== undefined) {
      console.log("I am NOT undefined");
      //Show "remove" button
      return (
        <div class="remove">
          <div class="remove__text" onClick={remove}>
            Remove from library
          </div>
          <svg class="delete">
            <use xlinkhref="img/sprite.svg#icon-cross"></use>
          </svg>
        </div>
      );
    } else {
      // Show "add" button
      console.log("I am undefined");
      return (
        <div class="add">
          <div class="add__text" onClick={add}>
            Add to library
          </div>
          <svg class="check">
            <use xlinkhref="img/sprite.svg#icon-checkmark"></use>
          </svg>
        </div>
      );
    }
  };

  const add = () => {
    //Identify Book ID
    //Send POST Request to Google to Add book
    // Make sure state gets updated (userBooks) or trigger re-rendering in some way!
    //Update button status
  };

  const remove = () => {
    //Identify Book ID
    //Send DELETE Request to Google to remove book
    //Update button status
  };

  return <React.Fragment>{button()}</React.Fragment>;
};

export default AddBtn;
