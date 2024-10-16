import React from "react";
import styled from "styled-components";
const Box = styled.div`
  width: 229px;
  height: auto;
  border-radius: 20px;
  background: white;
  margin: 18px 0px;
  .inner-card {
    background-color: white;
    height: 110px;
    width: 110px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .CircularProgress {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 50%;
  }
    .ProgressValue {
      position: absolute;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    .text {
      font-size: 1.2rem;
    font-weight: 500;
    }
    &:hover{
      transform: scale(1.1);
      transition: all 0.3s;
    }
    .progress-cards{
      margin: 18px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    }
    @media only screen and (max-width: 1000px){
      width: 198px;
    }
`;

const skills = ({ color, text ,percentage }) => {

const backgroundStyle = {
  background: `conic-gradient(${color} ${percentage * 3.6}deg, #ededed 0deg)`,
};
const Color={
  color:`${color}`
};
  return (
    <Box>
      <div className="progress-cards">
        <div className="CircularProgress" percentage={percentage} style={backgroundStyle}>
          <div className="ProgressValue">
            <div className=" inner-card" style={Color}>{percentage}%</div>
          </div>
        </div>
        <br />
        <div className="text">{text}</div>
      </div>
    </Box>
  );
};

export default skills;
