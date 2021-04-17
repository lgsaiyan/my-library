import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Back from "../components/Back";
import Rating from "../components/Rating";
import AddBtn from "../components/AddBtn";
import Footer from "../components/Footer";
import { GeneralContext } from "../contexts/General";
import { SearchContext } from "../contexts/Search";
import noImage from "../assets/no-img.png";

const Detail = () => {
  const { state } = useContext(GeneralContext);
  const { searchData } = useContext(SearchContext);
  const [descriptionState, setDescriptionState] = useState("");

  // Reset scroll position
  const scrollReset = () => {
    window.scrollTo(0, 0);
  };

  scrollReset();

  // Find book by ID in search data
  const bookID = state.bookID_for_detail;
  const book = searchData.results.find((el) => el.id === bookID);

  // Destructure book
  const { volumeInfo } = book;
  const {
    title,
    authors,
    categories,
    description,
    pageCount,
    publishedDate,
    imageLinks,
  } = volumeInfo;

  // Clean up data / error handeling

  const getAuthor = () => {
    if (authors) {
      if (authors[0].length < 20) {
        return authors[0];
      } else {
        return "Author name too long!";
      }
    }
    return "N/A";
  };

  const getImage = () => {
    if (imageLinks) {
      if (imageLinks.thumbnail) {
        return imageLinks.thumbnail;
      }
      if (imageLinks.smallThumbnail) {
        return imageLinks.smallThumbnail;
      }
      return noImage;
    }
  };

  // Handle description length
  const shortenDescription = () => {
    const shortDescriptionRaw = description.slice(0, 200);
    const shortDescription = shortDescriptionRaw.concat("...");
    return shortDescription;
  };

  // Handle description state
  const initialDescriptionState = () => {
    if (description) {
      if (description.length >= 200) {
        setDescriptionState("closed");
      } else {
        setDescriptionState("none");
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    initialDescriptionState();
  }, []);

  const getDescription = () => {
    if (descriptionState === "closed") {
      return (
        <React.Fragment>
          {shortenDescription()}
          <span
            style={{ cursor: "pointer", color: "purple" }}
            onClick={() => {
              setDescriptionState("open");
            }}
          >
            (Show more)
          </span>
        </React.Fragment>
      );
    } else if (descriptionState === "open") {
      return (
        <React.Fragment>
          {description}
          <span
            style={{ cursor: "pointer", color: "purple" }}
            onClick={() => {
              setDescriptionState("closed");
            }}
          >
            &nbsp;(Show less)
          </span>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>{description}</React.Fragment>;
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="content__book">
        <Back />
        <div class="img">
          <img src={getImage()} alt="" />
        </div>

        <div class="detail">
          <div class="detail__title">{title}</div>
          <div class="detail__author">
            <span style={{ fontWeight: 800 }}>Author: </span>
            {getAuthor()}
          </div>
          <br />
          <div class="detail__category">
            <span style={{ fontWeight: 800 }}>Category: </span>
            {categories}
          </div>
          <div class="detail__length">
            {" "}
            <span style={{ fontWeight: 800 }}>Length: </span>
            {pageCount} pages
          </div>
          <div class="detail__length">
            <span style={{ fontWeight: 800 }}>Published Date: </span>{" "}
            {publishedDate}
          </div>
          <div class="detail__description">
            <span style={{ fontWeight: 800 }}>Description: </span>{" "}
            {getDescription()}
          </div>
        </div>
        <Rating />
        <AddBtn />
      </div>
      <Footer />
    </React.Fragment>
  );

  // return (
  //   <React.Fragment>
  //     <Header />
  //     <div className="content__book">
  //       <Back />
  //       <div class="img">
  //         <img src={noImage} alt="" />
  //       </div>

  //       <div class="detail">
  //         <div class="detail__title">Oops!</div>
  //         <div class="detail__author">Error</div>
  //         <brk />
  //         <div class="detail__category">Sorry, something went wrong.</div>
  //       </div>
  //       <Rating />
  //       <AddBtn />
  //     </div>
  //     <Footer />
  //   </React.Fragment>
  // );
};

export default Detail;