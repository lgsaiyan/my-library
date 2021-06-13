import React, { useContext } from "react";
import history from "../history";
import { GeneralContext } from "../contexts/General";

const Back = () => {
  const { setState } = useContext(GeneralContext);

  const setPreviousLocationState = () => {
    setState({ previousLocation: "detail" });
  };

  const onClick = () => {
    setPreviousLocationState();
    history.goBack();
  };

  return (
    <React.Fragment>
      <div class="back" onClick={onClick}>
        <svg class="back__btn">
          <use xlinkHref="img/sprite.svg#icon-circle-left"></use>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Back;
