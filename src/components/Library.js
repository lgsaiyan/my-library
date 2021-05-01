import React from "react";
import Card from "./Card";
import SearchList from "./SearchList";
import UsersBooksList from "./UsersBooksList";
import noImage from "../assets/no-img.png";

const Library = () => {
  // destructure user and search data props

  //Pass data as a prop into renderedList

  return (
    <React.Fragment>
      <div class="library">
        <UsersBooksList />
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
