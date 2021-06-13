import React, { useState, useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import { GeneralContext } from "../contexts/General";

const Sort = () => {
  const { state, setState } = useContext(GeneralContext);
  const [orderState, setOrderState] = useState(state.sortOrderState);

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

  const index = options.findIndex((el) => el.label === state.sortState);
  console.log(index);

  const [selected, setSelected] = useState(options[index]);

  const sortDateAdded = () => {
    if (state.userBooks !== undefined && state.userBooks !== null) {
      let newData = state.userBooks;
      const sortedData = newData.sort((b, a) => {
        return new Date(a.userInfo.updated) - new Date(b.userInfo.updated);
      });
      setState({ masterData: sortedData });
    }
  };

  const sortDatePublished = () => {
    if (state.masterData !== undefined && state.masterData !== null) {
      let newData = state.masterData;
      const sortedData = newData.sort((b, a) => {
        return (
          new Date(a.volumeInfo.publishedDate) -
          new Date(b.volumeInfo.publishedDate)
        );
      });
      setState({ masterData: sortedData });
    }
  };

  const sortLength = () => {
    if (state.masterData !== undefined && state.masterData !== null) {
      let newData = state.masterData;
      const sortedData = newData.sort((b, a) => {
        return (
          new Date(a.volumeInfo.pageCount) - new Date(b.volumeInfo.pageCount)
        );
      });
      setState({ masterData: sortedData });
    }
  };

  const reOrder = () => {
    if (state.masterData !== null && state.masterData.length > 1) {
      let newData = state.masterData;
      const reOrderedData = newData.reverse();
      setState({ masterData: reOrderedData, page: null });

      if (orderState === "down") {
        setOrderState("up");
        //setState({ sortOrderState: "up" });
      } else {
        setOrderState("down");
        //setState({ sortOrderState: "down" });
      }
    }
  };

  const determineSorting = () => {
    if (state.masterData !== null && state.masterData !== "empty") {
      if (
        selected.label === "Date Added" /*&& state.sortState !== "Date Added"*/
      )
        sortDateAdded();
      if (
        selected.label === "Date Published" /*&&
        state.sortState !== "Date Published"*/
      )
        sortDatePublished();
      if (selected.label === "Length" /*&& state.sortState !== "Length"*/)
        sortLength();

      console.log("Sorting activated");
    }
  };

  useEffect(() => {
    // console.log(state.masterData !== null);
    // console.log(state.masterData !== "empty");
    console.log(state.previousLocation);

    if (state.previousLocation === "detail") {
      setState({ previousLocation: null });
    } else {
      determineSorting();
      setState({
        page: null,
        sortState: selected.label,
      });
    }
  }, [selected, state.masterData]);

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
      </div>
    </React.Fragment>
  );
};

export default Sort;
