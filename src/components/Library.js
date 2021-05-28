import React, { useContext, useEffect, useState } from "react";
import RenderedList from "./RenderedList";
import { SearchContext } from "../contexts/Search";
import { GeneralContext } from "../contexts/General";
import history from "../history";

const Library = ({ theUsersBooks }) => {
  console.log("I rendered Library");
  // Init consts
  const [data, setData] = useState(null);
  const { searchData } = useContext(SearchContext);
  const { state, setState } = useContext(GeneralContext);
  let fauxData = null;

  //Functions to update Context State if necessary
  const updateDetailData = () => {
    if (state.detailData === fauxData) {
      console.log("I returned null");
      return null;
    } else {
      setState({ detailData: fauxData });
      console.log("I am setting detail data state");
    }
  };

  const updateUserBooks = () => {
    if (state.userBooks === theUsersBooks) {
      return null;
    } else {
      setState({ userBooks: theUsersBooks });
      console.log("I am setting userBooks state");
    }
  };

  // Function to determine which data gets passed down to renderedList (based on path location)
  const determineData = async () => {
    try {
      const location = history.location.pathname;
      //console.log("Ran determine data");
      if (location === "/search") {
        //console.log(`Search Data in Library component: ${searchData}`);
        if (searchData !== null) {
          if (searchData.results !== null && searchData.results !== data) {
            setData(searchData.results);
            fauxData = searchData.results;
          } else {
            return null;
          }
        }
      } else if (location === "/home") {
        if (theUsersBooks !== null && theUsersBooks !== data) {
          setData(theUsersBooks);
          fauxData = theUsersBooks;
          //console.log("userbooks is full of books");
        }
      } else {
        setData("empty");
        fauxData = "empty";
        //console.log("I set data to empty");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const determineAndUpdateData = async () => {
    if (theUsersBooks !== null) {
      await determineData();
      console.log("determineDataFinished");
      //console.log(data);
      //console.log(theUsersBooks);
      updateDetailData();
      updateUserBooks();
    }
  };

  useEffect(() => {
    determineAndUpdateData();
  }, [theUsersBooks, searchData]);

  //console.log(data);

  return (
    <React.Fragment>
      <div class="library">
        <RenderedList data={data} />
        {/* <Card
          title="No Books to Show"
          author="Nobody"
          rating="0 stars"
          img="/img/world.jpg"
        /> */}

        {/* <div class="library__book">
          <div class="library__book__img-container">
            <img src={noImage} alt="book-cover" />
          </div>
          <div class="library__book__title">Title</div>
          <div class="library__book__author">Author</div>
          <div class="library__book__rating">
            <div class="library__book__rating__star">&#9733;</div>
            <div class="library__book__rating__star">&#9733;</div>
            <div class="library__book__rating__star">&#9733;</div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Library;
