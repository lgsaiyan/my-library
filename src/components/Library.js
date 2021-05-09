import React, { useContext } from "react";
import Card from "./Card";
import SearchList from "./SearchList";
import RenderedList from "./RenderedList";
import noImage from "../assets/no-img.png";
import { SearchContext } from "../contexts/Search";
import history from "../history";

const Library = ({ userBooks }) => {
  // Init consts
  let data;
  const { searchData } = useContext(SearchContext);

  //Determine based on path location which gets passed down to renderedList
  const location = history.location.pathname;
  if (location === "/search") {
    console.log(searchData);
    data = searchData.results;
  } else {
    data = userBooks;
  }

  //Pass data as a prop into renderedList
  //const data = userBooks;
  console.log(data);

  return (
    <React.Fragment>
      <div class="library">
        <RenderedList data={data} />
        <Card
          title="Bingo"
          author="Fat ass"
          rating="3 stars"
          img="/img/world.jpg"
        />

        <Card
          title="Waking up"
          author="Fat ass"
          rating="3 stars"
          img="/img/world.jpg"
        />

        <div class="library__book">
          <div class="library__book__img-container">
            <img src={noImage} alt="book-cover" />
          </div>
          <div class="library__book__title">Title</div>
          <div class="library__book__author">Author</div>
          <div class="library__book__rating">
            <div class="library__book__rating__star">&#9733;</div>
            <div class="library__book__rating__star">&#9733;</div>
            <div class="library__book__rating__star">&#9733;</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Library;
