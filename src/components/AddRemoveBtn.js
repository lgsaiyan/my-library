import React, { useState, useContext, useEffect } from "react";
import { GeneralContext } from "../contexts/General";
import google from "../api/googleBooks";

const AddRemoveBtn = () => {
  const { state, setState } = useContext(GeneralContext);
  console.log(state.userBooks);

  const getUsersBooks = async () => {
    //Make API request
    try {
      const response = await google.get("/mylibrary/bookshelves/0/volumes", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });

      //Convert google data into Array
      const results = Object.values(response.data.items);

      // Set data in State
      setState({ userBooks: results });
    } catch (err) {
      console.log(err);
    }
  };

  // Check status of book to set button
  let validate;
  if (state.userBooks) {
    validate = state.userBooks.find((el) => el.id === state.bookID_for_detail);
    console.log(`there is a userbooks, and it is: ${validate}`);
    if (validate !== undefined) {
    }
  } else {
    console.log("There is no userBooks data");
    validate = undefined;
  }
  console.log(validate);
  console.log(state.userBooks);

  const add = async () => {
    if (state.authStatus === "guest") {
      return alert("You must sign in to add books to your library!");
    }
    //Send POST Request to Google to Add book
    const postBook = async () => {
      console.log("trying to add");
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
        //IF response is 200, update usersBooks
        if (response.status === 200) {
          await getUsersBooks();

          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };

    await postBook();
  };

  const remove = async () => {
    //Send POST Request to Google to Add book
    console.log("trying to remove book");
    const removeBook = async () => {
      //Make API request
      try {
        const response = await google.post(
          `/mylibrary/bookshelves/0/removeVolume?volumeId=${state.bookID_for_detail}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        //IF response is 200, update usersBooks
        if (response.status === 200) {
          await getUsersBooks();
        }
      } catch (err) {
        console.log(err);
      }
    };

    await removeBook();
  };

  const button = () => {
    console.log("button called");
    if (validate === undefined) {
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
    } else if (validate !== undefined) {
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
    }
  };

  return <React.Fragment>{button()}</React.Fragment>;
};

export default AddRemoveBtn;
