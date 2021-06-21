import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";
import google from "../api/googleBooks";

/**
  *Renders button to add or remove books from library 
  */
const AddRemoveBtn = () => {
  const { state, setState } = useContext(GeneralContext);

  const getUsersBooks = async () => {
    try {
      const response = await google.get("/mylibrary/bookshelves/0/volumes", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });

      const results = Object.values(response.data.items);
      setState({ userBooks: results });
    } catch (err) {
      console.log(err);
    }
  };

  let validate;
  if (state.userBooks) {
    validate = state.userBooks.find((el) => el.id === state.bookID_for_detail);
    if (validate !== undefined) {
    }
  } else {
    validate = undefined;
  }

  const add = async () => {
    if (state.authStatus === "guest") {
      return alert("You must sign in to add books to your library!");
    }

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
        console.log(err);
      }
    };

    await postBook();
  };

  const remove = async () => {
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
        console.log(err);
      }
    };

    await removeBook();
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
