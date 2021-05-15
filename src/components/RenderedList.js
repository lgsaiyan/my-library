import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { GeneralContext } from "../contexts/General";
import noImage from "../assets/no-img.png";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import history from "../history";

const RenderedList = ({ data }) => {
  const { state, setState } = useContext(GeneralContext);
  const location = history.location.pathname;

  useEffect(() => {
    setState({ detailData: data });
  }, [data]);

  // Data is either "loading", search results or users bookshelf
  if (state.authStatus === "guest" && location !== "/search") {
    return (
      <Card
        id={null}
        title={"You must sign in to view your library!"}
        author={"You can still search, though."}
        rating={<div class="library__book__rating__star">&#9733;</div>}
        img={noImage}
        key={1000}
      />
    );
  } else if (data === "empty") {
    return (
      <Card
        id={null}
        title={"You have no books :("}
        author={"Do you even read?"}
        rating={<div class="library__book__rating__star">&#9733;</div>}
        img={noImage}
        key={100}
      />
    );
  } else if (data) {
    const list = data.map((book) => {
      const { volumeInfo } = book;
      const { title, authors, imageLinks } = volumeInfo;

      const getAuthor = () => {
        if (authors) {
          if (authors[0].length < 20) {
            return authors[0];
          } else {
            return "Author name too long!";
          }
        }
        return "Author N/A";
      };

      const getImage = () => {
        if (imageLinks) {
          if (imageLinks.thumbnail) {
            return imageLinks.thumbnail;
          }
          if (imageLinks.smallThumbnail) {
            return imageLinks.smallThumbnail;
          }
          return noImage;
        }
      };
      const getTitle = () => {
        if (title.length > 40) {
          const shortTitle = title.slice(0, 40);
          const newTitle = shortTitle.concat("...");
          return newTitle;
        }
        return title;
      };

      return (
        <Card
          id={book.id}
          title={getTitle()}
          author={getAuthor()}
          rating="3 stars"
          img={getImage()}
          key={book.id}
        />
      );
    });

    return <React.Fragment>{list}</React.Fragment>;
  } else {
    return <LoadSpinner />;
  }
};

export default RenderedList;
