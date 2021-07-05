import React, { useState, useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import { GeneralContext } from "../contexts/General";

/**
 *Renders sorting component
 */
const Sort = () => {
  const { state, setState } = useContext(GeneralContext);

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
  const [selected, setSelected] = useState(options[index]);

  const reOrder = () => {
    if (state.orderState === "down") {
      setState({ orderState: "up", page: null });
    } else {
      setState({ orderState: "down", page: null });
    }
  };

  useEffect(() => {
    if (state.previousLocation === "detail") {
      setState({ previousLocation: null });
    } else {
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

/**
 * Sorts data based on date added to user books
 * @param {*} data
 * @returns new array
 */
export const sortFunctionDateAdded = (data) => {
  if (data.length > 1) {
    const sortedData = data.sort((b, a) => {
      return new Date(a.userInfo.updated) - new Date(b.userInfo.updated);
    });
    return sortedData;
  } else {
    return data;
  }
};

/**
 * Sorts data based on date published
 * @param {*} data
 * @returns new array
 */
export const sortFunctionDatePublished = (data) => {
  if (data.length > 1) {
    const sortedData = data.sort((b, a) => {
      return (
        new Date(a.volumeInfo.publishedDate) -
        new Date(b.volumeInfo.publishedDate)
      );
    });
    return sortedData;
  } else {
    return data;
  }
};

/**
 * Sorts data based on length of book
 * @param {*} data
 * @returns new array
 */
export const sortFunctionLength = (data) => {
  if (data.length > 1) {
    const sortedData = data.sort((b, a) => {
      return (
        new Date(a.volumeInfo.pageCount) - new Date(b.volumeInfo.pageCount)
      );
    });
    return sortedData;
  } else {
    return data;
  }
};

export const reOrder = (data) => {
  if (data !== null && data.length > 1) {
    const reOrderedData = data.reverse();
    return reOrderedData;
  } else {
    return data;
  }
};
