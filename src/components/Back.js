import React, { useContext } from "react";
import history from "../history";
import { GeneralContext } from "../contexts/General";

const Back = () => {
  const { state, setState } = useContext(GeneralContext);

  //Need to determine this state for the Sort component, so it doesn't modify the state.page state to null when you go back to "home".
  const setPreviousLocationState = () => {
    // if (state.page == 1) {
    //   setState({ previousLocation: null });
    // } else {
    setState({ previousLocation: "detail" });
    // }
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
