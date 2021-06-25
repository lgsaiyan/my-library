import React, { useContext } from "react";
import Card from "./Card";
import { GeneralContext } from "../contexts/General";
import { SearchContext } from "../contexts/Search";
import noImage from "../assets/no-img.png";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import history from "../history";

/**
 *Renders cards inside Library component
 */
const RenderedList = () => {
  const { state } = useContext(GeneralContext);
  const { searchData } = useContext(SearchContext);
  const location = history.location.pathname;
  const data = state.masterData;
  const renderData =
    state.paginationData === null ? state.masterData : state.paginationData;

  let searchResults = null;
  const getSearchResultsChecker = () => {
    if (searchData) {
      if (searchData.results !== null) {
        searchResults = searchData.results;
        return searchResults;
      }
    }
  };
  getSearchResultsChecker();

if (location === "/search" && data !== searchResults) {
    return <LoadSpinner />;
  } else if (data) {
    const list = renderData.map((book) => {
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
        if (title) {
          if (title.length > 40) {
            const shortTitle = title.slice(0, 40);
            const newTitle = shortTitle.concat("...");
            return newTitle;
          }
        }

        return title;
      };

      const getRating = () => {
        const unparsedStoredRatings = localStorage.getItem("ratings");
        let storedRatings = JSON.parse(unparsedStoredRatings);
        if (!storedRatings) {
          storedRatings = [];
        }

        const isItInStoredRatings = storedRatings.find(
          (el) => el.id === book.id
        );
        if (isItInStoredRatings) {
          const rating = isItInStoredRatings.rating;

          let stars = [];
          let i;
          for (i = 0; i < rating; i++) {
            stars.push(<div class="library__book__rating__star">&#9733;</div>);
          }

          return <React.Fragment>{stars}</React.Fragment>;
        }

        return <div>Not Rated</div>;
      };

      return (
        <Card
          id={book.id}
          title={getTitle()}
          author={getAuthor()}
          rating={getRating()}
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
