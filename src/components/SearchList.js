import React, { useContext } from "react";
import Card from "./Card";
import { SearchContext } from "../contexts/Search";
import noImage from "../assets/no-img.png";

const SearchList = () => {
  const { searchData } = useContext(SearchContext);

  if (searchData) {
    const renderedList = searchData.results.map((book) => {
      const { volumeInfo } = book;
      const { title, authors, imageLinks } = volumeInfo;

      const getAuthor = () => {
        if (authors) {
          return authors[0];
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
      console.log(title.length);

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

    return <React.Fragment>{renderedList}</React.Fragment>;
  } else {
    return null;
  }
};

export default SearchList;
