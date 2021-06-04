import "./dropdown.css";
import React, { useState, useEffect, useRef } from "react";
import history from "../history";

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current) {
        if (ref.current.contains(event.target)) {
          return;
        }
      }

      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.label === selected.label) {
      return null;
    }

    return (
      <div
        key={option.key}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="sort__menu dropdown">
      <div
        onClick={() => setOpen(!open)}
        className={`btn ${open ? "active" : ""}`}
      >
        <div className="text">Sort by: {selected.label}</div>
        <div className={`dropdown-content ${open ? "show" : ""}`}>
          {renderedOptions}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

// //      <div className="sort__menu btn dd-wrapper">Sort by: date added</div>

// import React, { useState } from "react";
// import "./dropdown.css";

// const Dropdown = ({ title, items = [], multiSelect = false }) => {
//   const [open, setOpen] = useState(false);
//   const [selection, setSelection] = useState([]);
//   const toggle = () => setOpen(!open);

//   const handleOnClick = (item) => {
//     //Nothing
//     if (!selection.some((current) => current.id === item.id)) {
//       if (!multiSelect) {
//         setSelection([item]);
//       } else if (multiSelect) {
//         //Dont need multi-select for my app!!!
//         setSelection([...selection, item]);
//       } else {
//         let selectionAfterRemoval = selection;
//         selectionAfterRemoval = selectionAfterRemoval.filter(
//           (current) => current.id !== item.id
//         );
//         setSelection([...selectionAfterRemoval]);
//       }
//     }
//   };

//   function isItemInSelection(item) {
//     if (selection.some((current) => current.id === item.id)) {
//       return true;
//     }

//     return false;
//   }

//   return (
//     <React.Fragment>
//       <div className="sort__menu btn dd-wrapper">
//         Sort by: date added
//         <div
//           tabIndex={0}
//           className="dd-header"
//           role="button"
//           onKeyPress={() => toggle(!open)}
//         >
//           <div className="dd-header_title">
//             <p className="dd-header_title--bold">{title}</p>
//           </div>
//           <div className="dd-header__action">
//             <p>{open ? "Close" : "open"} </p>
//           </div>
//         </div>
//         {open && (
//           <ul className="dd-list">
//             {items.map((item) => (
//               <li className="ddi-list-item" key={item.id}>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     handleOnClick(item);
//                   }}
//                 >
//                   <span>{item.value}</span>
//                   <span>{isItemInSelection(item) && "Selected"}</span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </React.Fragment>
//   );
// };

// export default Dropdown;

// //      <div className="sort__menu btn dd-wrapper">Sort by: date added</div>
