import React, { useState, useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import { GeneralContext } from "../contexts/General";

const Sort = () => {
  const { state, setState } = useContext(GeneralContext);
  //const [orderState, setOrderState] = useState(state.sortOrderState);

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
    const sortedData = sortFunctionDateAdded(state.masterData);
    setState({ masterData: sortedData });
  };

  const sortDatePublished = () => {
    const sortedData = sortFunctionDatePublished(state.masterData);
    setState({ masterData: sortedData });
  };

  const sortLength = () => {
    const sortedData = sortFunctionLength(state.masterData);
    setState({ masterData: sortedData });
  };

  const determineSorting = () => {
    if (
      state.masterData !== undefined &&
      state.masterData !== null &&
      state.masterData !== "empty"
    ) {
      if (selected.label === "Date Added") sortDateAdded();
      if (selected.label === "Date Published") sortDatePublished();
      if (selected.label === "Length") sortLength();

      console.log("Sorting activated");
    }
  };

  const reOrder = () => {
    if (state.orderState === "down") {
      setState({ orderState: "up", page: null });
    } else {
      setState({ orderState: "down", page: null });
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
          <use
            xlinkHref={`img/sprite.svg#icon-circle-${state.orderState}`}
          ></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Sort;

export const sortFunctionDateAdded = (data) => {
  const sortedData = data.sort((b, a) => {
    return new Date(a.userInfo.updated) - new Date(b.userInfo.updated);
  });
  return sortedData;
};

export const sortFunctionDatePublished = (data) => {
  const sortedData = data.sort((b, a) => {
    return (
      new Date(a.volumeInfo.publishedDate) -
      new Date(b.volumeInfo.publishedDate)
    );
  });
  return sortedData;
};

export const sortFunctionLength = (data) => {
  const sortedData = data.sort((b, a) => {
    return new Date(a.volumeInfo.pageCount) - new Date(b.volumeInfo.pageCount);
  });
  return sortedData;
};

export const reOrder = (data) => {
  if (data !== null && data.length > 1) {
    const reOrderedData = data.reverse();
    return reOrderedData;
  }
};
