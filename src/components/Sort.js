import React, { useState, useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import { GeneralContext } from "../contexts/General";

const Sort = () => {
  const { state, setState } = useContext(GeneralContext);
  const [orderState, setOrderState] = useState("down");

  const options = [
    {
      label: "Date Added",
      key: 1,
    },
    {
      label: "Date Published",
      key: 2,
    },
    {
      label: "Length",
      key: 3,
    },
  ];

  const [selected, setSelected] = useState(options[0]);

  const sortDateAdded = () => {
    if (state.userBooks !== undefined && state.userBooks !== null) {
      let newData = state.userBooks;
      const sortedData = newData.sort((a, b) => {
        return new Date(a.userInfo.updated) - new Date(b.userInfo.updated);
      });
      setState({ currentData: sortedData });
    }
  };

  const sortDatePublished = () => {
    if (state.currentData !== undefined && state.currentData !== null) {
      let newData = state.currentData;
      const sortedData = newData.sort((a, b) => {
        return (
          new Date(a.volumeInfo.publishedDate) -
          new Date(b.volumeInfo.publishedDate)
        );
      });
      setState({ currentData: sortedData });
    }
  };

  const sortLength = () => {
    if (state.currentData !== undefined && state.currentData !== null) {
      let newData = state.currentData;
      const sortedData = newData.sort((a, b) => {
        return (
          new Date(a.volumeInfo.pageCount) - new Date(b.volumeInfo.pageCount)
        );
      });
      setState({ currentData: sortedData });
    }
  };

  const reOrder = () => {
    let newData = state.currentData;
    const reOrderedData = newData.reverse();
    setState({ currentData: reOrderedData });

    if (orderState === "down") {
      setOrderState("up");
    } else {
      setOrderState("down");
    }
  };

  useEffect(() => {
    if (state.userBooks.length > 1) {
      if (selected.label === "Date Added") sortDateAdded();
      if (selected.label === "Date Published") sortDatePublished();
      if (selected.label === "Length") sortLength();
    }
  }, [selected]);

  return (
    <React.Fragment>
      <div className="sort">
        <Dropdown
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
        <svg className="sort__btn circle-btn" onClick={reOrder}>
          <use xlinkHref={`img/sprite.svg#icon-circle-${orderState}`}></use>
        </svg>
        {/* <svg className="sort__btn circle-btn" onClick={reOrder}>
          <use xlinkHref="img/sprite.svg#icon-circle-down"></use>
        </svg> */}
      </div>
    </React.Fragment>
  );
};

export default Sort;
