import React from "react";
import Header from "../components/Header";
import Back from "../components/Back";
import Rating from "../components/Rating";
import AddBtn from "../components/AddBtn";
import Footer from "../components/Footer";

const Detail = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="content__book">
        <Back />
        <div class="img">
          <img src="/img/orwell.jpg" alt="" />
        </div>

        <div class="detail">
          <div class="detail__title">Title</div>
          <div class="detail__author">Author</div>
          <brk />
          <div class="detail__category">Cateogry</div>
          <div class="detail__length">Length</div>
          <div class="detail__description">
            Description goes here. So fancy! This book is excellent. Makes me
            want to read day and night.
          </div>
        </div>
        <Rating />
        <AddBtn />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Detail;
