import React, { useState, useContext } from "react";
import Back from "./Back";
import Rating from "./Rating";
import AddRemoveBtn from "./AddRemoveBtn";
import { GeneralContext } from "../contexts/General";
import noImage from "../assets/no-img.png";

/**
  *Renders content component inside Detail page 
  */
const Content = () => {
  const { state } = useContext(GeneralContext);
  const [descriptionState, setDescriptionState] = useState(null);
  const [error, setError] = useState(undefined)

  const scrollReset = () => {
    window.scrollTo(0, 0);
  };
  scrollReset();

  const bookID = state.bookID_for_detail;

  if (!bookID) {
    return (
      <div className="content__book">
        <Back />
        <div class="img">
          <img src={noImage} alt="" />
        </div>

        <div class="detail">
          <div class="detail__title">Oops!</div>
          <div class="detail__author">Error</div>
          <brk />
          <div class="detail__category">Sorry, something went wrong.</div>
        </div>
      </div>
    );
  }

  const book = state.masterData.find((el) => el.id === bookID);

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

  const shortenDescription = () => {
    const shortDescriptionRaw = description.slice(0, 200);
    const shortDescription = shortDescriptionRaw.concat("...");
    return shortDescription;
  };

  let setDescription = null;
  const handleDescriptionState = () => {
    if (descriptionState !== null) {
      setDescription = descriptionState;
    } else {
      if (description) {
        if (description.length >= 200) {
          setDescription = "closed";
        } else {
          setDescription = "none";
        }
      } else {
        return null;
      }
    }
  };

  handleDescriptionState();

  const getDescription = () => {
    if (setDescription === "closed") {
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
    } else if (setDescription === "open") {
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

  const handleError= () => {
    return (
      <div style={{color: "red", justifyContent: "center", display: "flex", gridColumn: "1 / 3"}}>{error}</div>
    )
  };

  const handleErrorState = (error) => {
    setError(error);
  };

  return (
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
      <AddRemoveBtn handleErrorState={handleErrorState} />
      {error ? handleError() : null }
    </div>
  );
};

export default Content;
