import React from "react";
import history from "../history";

const Card = (props) => {
  const onClick = () => {
    history.push("/detail");
  };

  return (
    <React.Fragment>
      <div class="library__book" onClick={onClick}>
        <div class="library__book__img-container">
          <img src={props.img} alt="book-cover" />
        </div>
        <div class="library__book__title">{props.title}</div>
        <div class="library__book__author">{props.author}</div>
        <div class="library__book__rating">{props.rating}</div>
      </div>
    </React.Fragment>
  );
};

export default Card;
