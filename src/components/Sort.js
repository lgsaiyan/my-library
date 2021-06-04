import React, { useState, useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import { GeneralContext } from "../contexts/General";

const Sort = () => {
  const { state, setState } = useContext(GeneralContext);

  const options = [
    {
      label: "Relevance",
      key: 1,
    },
    {
      label: "Date Published",
      key: 2,
    },
    {
      label: "Rating",
      key: 3,
    },
  ];

  const [selected, setSelected] = useState(options[0]);

  console.log(state.userBooks);

  const sortRelevance = () => {
    console.log(state.currentData);
    console.log(state.userBooks);
    if (state.currentData !== state.userBooks) {
      console.log("Set relvance state");
      setState({ currentData: state.userBooks });
    }
  };

  const sortDatePublished = () => {
    console.log(state.currentData);
    if (state.currentData !== undefined && state.currentData !== null) {
      //console.log("Sorting date published...");
      let newData = state.currentData;
      //console.log(newData);
      const sortedData = newData.sort((a, b) => {
        console.log("I'm inside the vagina");
        //console.log(a.volumeInfo.publishedDate);
        return (
          new Date(a.volumeInfo.publishedDate) -
          new Date(b.volumeInfo.publishedDate)
        );
      });
      //console.log(sortedData);
      setState({ currentData: sortedData });
    }
  };

  const orderDataPublished = () => {};

  useEffect(() => {
    if (selected.label === "Relevance") sortRelevance();

    console.log("Use Effect in Sort Comp Activated");
    if (selected.label === "Date Published") sortDatePublished();
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
