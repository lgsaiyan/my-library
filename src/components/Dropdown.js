import "./dropdown.css";
import React, { useState, useEffect, useRef } from "react";

/**
  *Renders dropdown component 
  */
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
