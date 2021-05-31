import React, { useState } from "react";
import Dropdown from "./Dropdown";

const Sort = () => {
  //Check Auth Status to set options data
  const options = [
    {
      label: "Relevance",
      value: "Data",
    },
    {
      label: "Date Published",
      value: "Ordered Data",
    },
    {
      label: "Rating",
      value: "Rating Data",
    },
    {
      label: "Length",
      value: "Pages",
    },
  ];

  const [selected, setSelected] = useState(options[0]);

  //Do something here when selected state changes

  return (
    <React.Fragment>
      <div className="sort">
        <Dropdown
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
        <svg className="sort__btn circle-btn">
          <use xlinkHref="img/sprite.svg#icon-circle-up"></use>
        </svg>
        <svg className="sort__btn circle-btn">
          <use xlinkHref="img/sprite.svg#icon-circle-down"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Sort;
