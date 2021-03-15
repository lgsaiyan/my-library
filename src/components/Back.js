import React from "react";
import history from "../history";

const Back = () => {
  const onClick = () => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <div class="back" onClick={onClick}>
        <svg class="back__btn">
          <use xlinkHref="img/sprite.svg#icon-circle-left"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Back;
