import React from "react";

const AddBtn = () => {
  return (
    <React.Fragment>
      <div class="add">
        <div class="add__text">Add to library</div>
        <svg class="check">
          <use xlinkHref="img/sprite.svg#icon-checkmark"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default AddBtn;
