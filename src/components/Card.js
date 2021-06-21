import React, { useContext } from "react";
import history from "../history";
import { GeneralContext } from "../contexts/General";

/**
  *Renders card component; data is passed into this component from RenderedList component 
  */
const Card = (props) => {
  const { setState } = useContext(GeneralContext);
  const onClick = () => {
    if (props.id) {
      setState({ bookID_for_detail: props.id });
      history.push("/detail");
    } else {
      return null;
    }
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
