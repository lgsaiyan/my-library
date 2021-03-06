import React from "react";

const Library = () => {
  return (
    <React.Fragment>
      <div class="library">
        <div class="library__book">
          <div class="library__book__img-container">
            <img src="/img/world.jpg" alt="book-cover" />
          </div>
          <div class="library__book__title">Title</div>
          <div class="library__book__author">Author</div>
          <div class="library__book__rating">
            <div class="library__book__rating__star">&#9733;</div>
            <div class="library__book__rating__star">&#9733;</div>
            <div class="library__book__rating__star">&#9733;</div>
          </div>
        </div>

        <div class="library__book">
          <div class="library__book__img-container">
            <img src="/img/orwell.jpg" alt="book-cover" />
          </div>
          <div class="library__book__title">Title</div>
          <div class="library__book__author">Author</div>
          <div class="library__book__rating">Rating</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Library;
