import React, { useContext, useState } from "react";
import { GeneralContext } from "../contexts/General";

const Rating = () => {
  const { state } = useContext(GeneralContext);
  const [bookRating, setBookRating] = useState(null);

  let ratings = [];
  const previousRatings = localStorage.getItem("ratings");
  if (previousRatings) {
    const parsedPreviousRatings = JSON.parse(previousRatings);
    ratings = [...parsedPreviousRatings];
  }

  const book = {
    id: state.bookID_for_detail,
  };

  const index = ratings.findIndex((el) => el.id === book.id);

  if (index !== -1) {
    if (bookRating !== ratings[index].rating)
      setBookRating(ratings[index].rating);
  }

  const onChange = (e) => {
    const { value } = e.target;

    book.rating = value;

    if (index !== -1) {
      ratings.splice(index, 1, book);
    } else {
      ratings.push(book);
    }

    //Using Local Storage because Google Books API removed feature I was planning to use for rating system
    localStorage.setItem("ratings", JSON.stringify(ratings));
    setBookRating(book.rating);
  };

  return (
    <React.Fragment>
      <div class="rating">
        <div class="rating__text">Rating:</div>
        <div class="rate">
          <input
            type="radio"
            id="star5"
            name="rate"
            value="5"
            onChange={onChange}
            checked={bookRating === "5"}
          />
          <label for="star5" title="text">
            5 stars
          </label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            onChange={onChange}
            checked={bookRating === "4"}
          />
          <label for="star4" title="text">
            4 stars
          </label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            onChange={onChange}
            checked={bookRating === "3"}
          />
          <label for="star3" title="text">
            3 stars
          </label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            onChange={onChange}
            checked={bookRating === "2"}
          />
          <label for="star2" title="text">
            2 stars
          </label>
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            onChange={onChange}
            checked={bookRating === "1"}
          />
          <label for="star1" title="text">
            1 star
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Rating;
