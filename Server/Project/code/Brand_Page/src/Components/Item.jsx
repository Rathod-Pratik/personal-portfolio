import React from "react";

const item = () => {
  return (
    <div className="hero">
      <div className="hero-text">
        <div className="hero-title">YOUR FEET DESERVE THE BEST</div>
        <div className="hero-info">
          YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
          SHOES.
        </div>
        <div>
          <button className="shop-btn">Shop now</button>
          <button className="category">Category</button>
        </div>
        <div className="brand-logo">
            <span>Also available on</span>
            <br />
          <img src="/Image/flipkart.png" alt="" />
          <img src="/Image/amazon.png" alt="" />
        </div>
      </div>
      <div className="home-image">
        <img src="/Image/shoe_image.png" alt="" />
      </div>
    </div>
  );
};

export default item;
