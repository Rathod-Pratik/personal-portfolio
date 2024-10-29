import React from "react";
import styled from "styled-components";

const Rules = () => {
  return (
    <Rule>
      <h1>How to play dice game</h1>
      <div>
        <p>Select any number</p>
        <p>Click on dice image</p>
        <p>
          after click on dice if selected number is equal to dice number you
          will get same point as dice{" "}
        </p>
        <p>if you get wrong guess then 2 point will be dedcuted </p>
      </div>
    </Rule>
  );
};

export default Rules;

const Rule = styled.div`
 max-width: 800px;
  margin: 0 auto;
  background-color: #fbf1f1;
  padding: 20px;
  margin-top: 40px;
  border-radius: 10px;
  h1 {
    padding: 12px 12px;
    font-size: 24px;
    font-weight: bold;
  }
  div {
    padding: 12px 12px;
    font-size: 16px;
  }
`;
