import React, { useState, useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import { GeneralContext } from "../contexts/General";

const Sort = () => {
  const { state, setState } = useContext(GeneralContext);

  //Do we need an object in the array, or can we just use the labels themselves in an array?
  const options = [
    {
      label: "Relevance",
      value: state.data,
    },
    {
      label: "Date Published",
      value: "Ordered Data",
    },
    {
      label: "Rating",
      value: "Rating Data",
    },
  ];

  const [selected, setSelected] = useState(options[0]);

  const sortDatePublished = () => {
    console.log(state.data);
    if (state.data !== undefined /*&& state.data !== null*/) {
      console.log("Sorting date published...");
      console.log(state.data);
      let newData = state.data;
      console.log(newData);
      newData.sort((a, b) => {
        return a.volumeInfo.publishedDate - b.volumeInfo.publishedDate;
      });
      console.log(newData);
    }
  };

  const orderDataPublished = () => {};

  useEffect(() => {
    console.log("Use Effect in Sort Comp Activated");
    sortDatePublished();
  }, [selected]);

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
