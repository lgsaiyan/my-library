import React, { useState, useContext, useEffect } from "react";
import { GeneralContext } from "../contexts/General";
import google from "../api/googleBooks";

const AddBtn = () => {
  const { state } = useContext(GeneralContext);
  const [status, setStatus] = useState(null);

  // Check status of book (to set button status)
  console.log(state.bookID_for_detail);
  console.log(state.userBooks);

  let validate;
  if (state.userBooks) {
    validate = state.userBooks.find((el) => el.id === state.bookID_for_detail);
    console.log(`there is a userbooks, and it is: ${validate}`);
    if (validate !== undefined) {
      // setStatus(true);
    }
  } else {
    console.log("There is no userBooks data");
    validate = undefined;
  }
  console.log(validate);

  const add = async () => {
    //Send POST Request to Google to Add book
    console.log("trying to add");
    console.log("Acces TOkeN: " + state.accessToken);
    const postBook = async () => {
      //Make API request
      try {
        const response = await google.post(
          `/mylibrary/bookshelves/0/addVolume?volumeId=${state.bookID_for_detail}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);
        //Convert google data into Array
        //const results = Object.values(response.data.items);
        //console.log(results);

        //IF response is 204 no content, update status to "true"
        if (response.status === 200) {
          console.log("status is true");
          setStatus(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    await postBook();

    // Make sure state gets updated (userBooks) or trigger re-rendering in some way!
  };

  const remove = () => {
    //Send DELETE Request to Google to remove book
    //Update status to false
  };

  // useEffect(() => {
  //   // DO I NEED THIS IF STATUS UPDATE AUTOMATICALLY SHOULD TRIGGER RERENDER???? AM I DOUBLING UP?
  //   button();
  // }, [status]);

  const button = () => {
    if (validate !== undefined || status === true) {
      console.log("I am NOT undefined");
      //Show "remove" button
      return (
        <div class="remove" onClick={remove}>
          <div class="remove__text">Remove from library</div>
          <svg class="delete">
            <use xlinkHref="img/sprite.svg#icon-cross"></use>
          </svg>
        </div>
      );
    } else {
      // Show "add" button
      console.log("I am undefined");
      return (
        <div class="add" onClick={add}>
          <div class="add__text">Add to library</div>
          <svg class="check">
            <use xlinkHref="img/sprite.svg#icon-checkmark"></use>
          </svg>
        </div>
      );
    }
  };

  return <React.Fragment>{button()}</React.Fragment>;
};

export default AddBtn;
