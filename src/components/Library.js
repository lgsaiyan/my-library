import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import SearchList from "./SearchList";
import RenderedList from "./RenderedList";
import noImage from "../assets/no-img.png";
import { SearchContext } from "../contexts/Search";
import history from "../history";
import LoadSpinner from "../LoadSpinner/LoadSpinner";

const Library = ({ userBooks }) => {
  // Init consts
  const [data, setData] = useState(null);
  //const [loaded, setLoaded] = useState(false);
  const { searchData } = useContext(SearchContext);

  // Function to determine which data gets passed down to renderedList (based on path location)
  const determineData = () => {
    const location = history.location.pathname;
    console.log("Ran determine data");
    if (location === "/search") {
      console.log(`Search Data in Library component: ${searchData}`);
      if (searchData !== null) {
        if (searchData.results !== null) {
          setData(searchData.results);
        } else {
          return null;
        }
      }
    } else if (location === "/home") {
      if (userBooks !== null) {
        setData(userBooks);
        console.log("i should be logged rn");
        console.log(userBooks);
      }
    } else {
      setData("empty");
      console.log("I set data to empty");
    }
  };

  useEffect(() => {
    determineData();
  });

  useEffect(() => {
    determineData();
  }, [userBooks, searchData]);

  //Pass data as a prop into renderedList
  //const data = userBooks;
  console.log(data);

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
