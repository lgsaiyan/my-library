import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";
import google from "../api/googleBooks";
import { sampleUserData } from "../data";

/**
  * Renders button to add or remove books from library
  * @param {*} handleErrorState 
  * @returns the react button for adding and removing books.
  */
const AddRemoveBtn = ( {handleErrorState} ) => {
  const { state, setState } = useContext(GeneralContext);

  /**
   * 
   */
  const getUsersBooks = async () => {
    try {
      const response = await google.get("/mylibrary/bookshelves/0/volumes", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      if (response.data.items !== null && response.data.items !== undefined) {
        const results = Object.values(response.data.items);
        setState({ userBooks: results });
        if (state.usingSampleData === true) {
          setState({ usingSampleData: false });
        }
      } else {
        setState({ userBooks: sampleUserData, usingSampleData: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  let validate;
  if (state.userBooks) {
    validate = state.userBooks.find((el) => el.id === state.bookID_for_detail);
  } else {
    validate = undefined;
  }

  const add = async () => {
    if (state.authStatus === "guest") {
      handleErrorState("You must sign in to add books to your library!")
    } else {
      const postBook = async () => {
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
          if (response.status === 200) {
            await getUsersBooks();
          }
        } catch (err) {
          console.error(err);
        }
      };
      await postBook();
    }
  };

  const remove = async () => {
    if (state.authStatus === "guest") {
      handleErrorState(
        "You must sign in to remove books from your library!"
      );

    } else if (state.usingSampleData === true) {
      handleErrorState(
        "This is a sample book; you cannot remove it. Please search for a real book to add to your library if you're dying to use this button."
      );
    } else {
      const removeBook = async () => {
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
          if (response.status === 200) {
            await getUsersBooks();
          }
        } catch (err) {
          console.error(err);
        }
      };

      await removeBook();
    }
  };

  const button = () => {
    if (validate === undefined) {
      return (
        <div class="add" onClick={add}>
          <div class="add__text">Add to library</div>
          <svg class="check">
            <use xlinkHref="img/sprite.svg#icon-checkmark"></use>
          </svg>
        </div>
      );
    } else if (validate !== undefined) {
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
