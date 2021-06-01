import React, { useContext } from "react";
import { GeneralContext } from "../contexts/General";

const Rating = () => {
  const { state } = useContext(GeneralContext);

  //Set Rating
  const onClick = (e) => {
    const { value } = e.target;

    const book = {
      id: state.bookID_for_detail,
      rating: value,
    };
    let ratings = [];
    const previousRatings = localStorage.getItem("ratings");
    if (previousRatings) {
      const parsedPreviousRatings = JSON.parse(previousRatings);
      console.log(parsedPreviousRatings);
      ratings = [...parsedPreviousRatings];
    }

    const isItRated = ratings.find((el) => el.id === book.id);
    console.log(isItRated);
    if (isItRated !== undefined) {
      const i = ratings.findIndex((el) => el.id === book.id);
      ratings.splice(i, 1, book);
      console.log("spliced");
    } else {
      ratings.push(book);
      console.log("pushed");
    }

    localStorage.setItem("ratings", JSON.stringify(ratings));
    console.log(ratings);
  };

  // Init Rating

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
            onClick={onClick}
          />
          <label for="star5" title="text">
            5 stars
          </label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            onClick={onClick}
          />
          <label for="star4" title="text">
            4 stars
          </label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            onClick={onClick}
          />
          <label for="star3" title="text">
            3 stars
          </label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            onClick={onClick}
          />
          <label for="star2" title="text">
            2 stars
          </label>
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            onClick={onClick}
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
